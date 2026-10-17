import {visit} from 'unist-util-visit'
import {renderMermaid} from "@mermaid-js/mermaid-cli"
import puppeteer, {Browser} from 'puppeteer';
import {Node} from 'unist';
import {Transformer} from 'unified';

interface CodeNode extends Node {
  lang?: string;
  value: string;
}

let browserInstance: Promise<Browser> | null = null;

function getPuppeteerLaunchOptions(): Parameters<typeof puppeteer.launch>[0] {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  return {
    headless: true,
    ...(executablePath ? {executablePath} : {}),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
}

async function getBrowserInstance() {
  if (!browserInstance) {
    console.log("Browser launch!");
    browserInstance = puppeteer.launch(getPuppeteerLaunchOptions());
  }
  return browserInstance;
}

const cache: { [key: string]: unknown } = {};

async function generateDiagrams(nodes: CodeNode[]) {
  const browser = await browserInstance;
  const svgs = await Promise.all(nodes.map(async (node) => {
    if (cache[node.value]) {
      return cache[node.value];
    } else {
      const svg = await renderMermaid(browser!, node.value, 'svg', {
        // mermaid-cli 12 embeds woff files into every SVG by default.
        // These pages already load site fonts, and the embedded files multiplied article HTML.
        fontEmbed: false,
        mermaidConfig: {
          // Mermaid 12 defaults to the ELK layout and the neo look, which wrap
          // existing labels mid-word. Keep the dagre layout and classic look
          // these diagrams were written for.
          layout: 'dagre',
          theme: 'default',
          look: 'classic',
          htmlLabels: false,
          flowchart: {
            htmlLabels: false,
            // Mermaid 12 measures label width more tightly and splits long
            // tokens such as "/caching-callback" across lines. Keep the width
            // these diagrams were authored against.
            wrappingWidth: 400,
          }
        }
      });

      const svgString = Buffer.from(svg.data.buffer).toString();

      cache[node.value] = svgString;
      return svgString;
    }
  }));


  svgs.map((svg, i) => {
    nodes[i].type = 'html';
    nodes[i].value = `<pre class='mermaid bg-white flex justify-center overflow-hidden'>${svg}</pre>`;
  });
}

export function remarkMermaid(): Transformer {
  return transformer;

  async function transformer(tree: Node) {
    const nodesToRender: CodeNode[] = [];

    visit(tree, 'code', (node: CodeNode) => {
      if (node.lang === 'mermaid') {
        nodesToRender.push(node);
      }
    });

    if (nodesToRender.length) {
      await getBrowserInstance();
      await generateDiagrams(nodesToRender);
    }
  }
}
