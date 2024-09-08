import {visit} from 'unist-util-visit'
import {renderMermaid} from "@mermaid-js/mermaid-cli"
import puppeteer from 'puppeteer';

export function remarkMermaid() {
  return transformer;

  // @ts-ignore
  async function transformer(tree) {
    const browser = await puppeteer.launch();
    console.log("Browser launched");

    const promises: Promise<unknown>[] = [];

    visit(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {

        promises.push(
          renderMermaid(browser, node.value, 'svg').then((svg) => {
              const svgString = svg.data.toString();
              console.log({svgString});

              node.type = 'html';
              node.value = `<pre class='mermaid bg-white flex justify-center overflow-hidden'>${svgString}</pre>`;
            }
          )
        );
      }
    });

    await Promise.all(promises);
    await browser.close();
  }
}
