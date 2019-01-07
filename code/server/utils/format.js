/**
 * 格式化留言
 * @param {*} list 
 */
export const formatMessage = (list) => {
  return list.map(item => {
    // item = delAuthorName(item)
    item.reply_list = item.reply_list.map(v => {
      v = delAuthorName(v)
      let {
        qq,
        email,
        city,
        questioner,
        ...params
      } = v
      let {
        qq: qq1,
        email: emaill1,
        city: city1,
        ...params1
      } = questioner
      questioner = params1
      questioner = delAuthorName(questioner)
      return { ...params,
        questioner
      }
    })
    return item
  })

  function delAuthorName(item) {
    if (item.isAuthor) {
      delete item.name
    }
    return item
  }
}