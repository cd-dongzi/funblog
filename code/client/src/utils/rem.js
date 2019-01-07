import config from '@/config/index'
// rem适配
export default () => {
    (function(win, doc){
        var widthScale = config.app.widthScale
        var docEl = doc.documentElement,
            refresh = function () { 
                var w = docEl.clientWidth,
                    bodyW = document.getElementsByTagName('body')[0].clientWidth,
                    w = w > bodyW ? bodyW : w,
                    rem = 100 * (w/widthScale) + 'px'
                docEl.style.fontSize = rem
                function setBodyFontSize () {
                    if (doc.body) {
                        doc.body.style.fontSize = '16px'
                    }else {
                        doc.addEventListener('DOMContentLoaded', refresh)
                    }
                }
                function correctPx () {
                    if (!w || w > 768) return
                    var div = document.createElement('div')
                    div.style.width = '1rem'
                    div.style.height = '0'
                    document.body.appendChild(div)
                    var ideal = 100 * w / widthScale
                    var rmd = (div.clientWidth / ideal)
                    if(rmd > 1.2 || rmd < 0.8){
                        docEl.style.fontSize = parseInt(rem) / rmd + 'px'
                    }
                    document.body.removeChild(div)
                }
                setBodyFontSize()  
                correctPx() 
            }
        refresh()
    })(window, document);
}