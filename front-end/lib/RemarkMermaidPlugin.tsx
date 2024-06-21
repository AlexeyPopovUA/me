import {visit} from 'unist-util-visit'
import Script from "next/script";

export function remarkMermaid() {
    return transformer;

    // @ts-ignore
    function transformer(tree) {
        visit(tree, 'code', (node) => {
            if (node.lang === 'mermaid') {
                node.type = 'html';
                node.value = `<pre class='mermaid bg-white flex justify-center overflow-hidden'>${node.value}</pre>`;
            }
        });
    }
}

export const MermaidInitializer = () =>
    <Script
        type="module"
        id="mermaid.initialize"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
            __html: `
            import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
            mermaid.initialize({startOnLoad: true});
            mermaid.contentLoaded();
    `,
        }}
    />;
