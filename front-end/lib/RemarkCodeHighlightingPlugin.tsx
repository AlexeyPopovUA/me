import {visit} from 'unist-util-visit';
import {
    transformerNotationDiff,
    transformerNotationHighlight
} from '@shikijs/transformers';

import {getSingletonHighlighter} from 'shiki';

let highlighterInstancePromise: ReturnType<typeof getSingletonHighlighter> | undefined;

export function remarkCode() {
    return transformer;

    // @ts-expect-error - todo > add proper types later
    async function transformer(tree) {
        const languages = ['ts', 'tsx', 'javascript', 'json', 'html', 'bash', 'shell', 'text', 'yaml'];
        highlighterInstancePromise = highlighterInstancePromise ? highlighterInstancePromise: getSingletonHighlighter({
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
