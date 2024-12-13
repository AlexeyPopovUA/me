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

async function getBrowserInstance() {
  if (!browserInstance) {
    console.log("Browser launch!");
    browserInstance = puppeteer.launch({headless: true, args: ['--no-sandbox']});
  }
}

const cache: { [key: string]: unknown } = {};

async function generateDiagrams(nodes: CodeNode[]) {
  const browser = await browserInstance;
  const svgs = await Promise.all(nodes.map(async (node) => {
    if (cache[node.value]) {
      return cache[node.value];
    } else {
      const svg = await renderMermaid(browser!, node.value, 'svg', {
        mermaidConfig: {
          htmlLabels: false,
          flowchart: {htmlLabels: false}
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
      void getBrowserInstance();
      await generateDiagrams(nodesToRender);
    }
  }
}

// Ensure the browser instance is closed when the process exits
process.on('exit', async () => {
  if (browserInstance) {
    console.log("Browser close!");
    await (await browserInstance).close();
  }
});