import highlightJs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import typescript from 'highlight.js/lib/languages/typescript'
import nginx from 'highlight.js/lib/languages/nginx'
highlightJs.registerLanguage('javascript', javascript)
highlightJs.registerLanguage('css', css)
highlightJs.registerLanguage('typescript', typescript)
highlightJs.registerLanguage('nginx', nginx)

export default highlightJs
