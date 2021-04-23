export default () => {
  // 窗口显示隐藏控制
  const hiddenProperty =
    'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : 'hidden'

  let title = document.title
  const hiddenTitle = '(●—●)喔哟，崩溃啦！'
  const showTitle = '(/≧▽≦/)咦！又好了！'
  const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
  let timer: NodeJS.Timeout
  const onVisibilityChange = function () {
    if (document.title !== hiddenTitle) {
      title = document.title.replace(showTitle, '')
    }
    if (!(document as any)[hiddenProperty]) {
      title = showTitle + title
      document.title = title
      timer = setTimeout(() => {
        clearTimeout(timer)
        document.title = title.replace(showTitle, '')
      }, 1000)
    } else {
      clearTimeout(timer)
      document.title = hiddenTitle
    }
  }
  document.addEventListener(visibilityChangeEvent, onVisibilityChange)
}
