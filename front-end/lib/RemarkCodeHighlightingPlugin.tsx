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
        const languages = ['ts', 'tsx', 'javascript', 'json', 'jsonc', 'html', 'bash', 'shell', 'text', 'yaml', 'prolog', 'dockerfile'];
        const langAliases: Record<string, string> = {
            js: 'javascript',
            jsx: 'tsx',
        };
        highlighterInstancePromise = highlighterInstancePromise ?? getSingletonHighlighter({
            themes: ['github-light', 'github-dark'],
            langs: languages,
        });

        const highlighter = await highlighterInstancePromise;
        const transformers = [
            transformerNotationDiff(),
            transformerNotationHighlight()
        ];

        visit(tree, 'code', (node) => {
            const rawLang = node.lang?.toLowerCase() ?? 'text';
            const lang = langAliases[rawLang] ?? rawLang;
            if (!languages.includes(lang)) return;
            const code = node.value;
            const lightHtml = highlighter.codeToHtml(code, {
                theme: 'github-light',
                lang,
                transformers,
            });
            const darkHtml = highlighter.codeToHtml(code, {
                theme: 'github-dark',
                lang,
                transformers,
            });
            // Add theme class to each pre for CSS toggling; wrap in one container
            // Use regex to properly add classes without breaking existing ones
            const lightPre = lightHtml.replace(/<pre class="([^"]*)"/, '<pre class="$1 shiki-light"');
            const darkPre = darkHtml.replace(/<pre class="([^"]*)"/, '<pre class="$1 shiki-dark"');
            node.type = 'html';
            node.value = `<div class="shiki-code-block">${lightPre}${darkPre}</div>`;
        });
    }
}
