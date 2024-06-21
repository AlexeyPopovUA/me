import {visit} from 'unist-util-visit';
import {
    transformerNotationDiff,
    transformerNotationHighlight
} from '@shikijs/transformers';

import {getHighlighter} from 'shiki';

let highlighterInstancePromise: ReturnType<typeof getHighlighter> | undefined;

export function remarkCode() {
    return transformer;

    // @ts-ignore
    async function transformer(tree) {
        const languages = ['ts', 'tsx', 'javascript', 'json', 'html', 'bash', 'shell', 'text'];
        highlighterInstancePromise = highlighterInstancePromise ? highlighterInstancePromise: getHighlighter({
            themes: ['github-light'],
            langs: languages,
        });

        const highlighter = await highlighterInstancePromise;

        visit(tree, 'code', (node) => {
            if (languages.includes(node.lang)) {
                node.type = 'html';
                node.value = highlighter.codeToHtml(node.value, {
                    theme: 'github-light',
                    lang: node.lang,
                    transformers: [
                        transformerNotationDiff(),
                        transformerNotationHighlight()
                    ]
                });
            }
        });
    }
}
