import highlightJs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import nginx from 'highlight.js/lib/languages/nginx';
import typescript from 'highlight.js/lib/languages/typescript';
highlightJs.registerLanguage('javascript', javascript);
highlightJs.registerLanguage('css', css);
highlightJs.registerLanguage('typescript', typescript);
highlightJs.registerLanguage('nginx', nginx);

export default highlightJs;
