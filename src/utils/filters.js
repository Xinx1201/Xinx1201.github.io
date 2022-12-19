// 过滤关键字
export function filterKeyWord (val, keyWord = '变异') {
  if (!val) return
  if (val.indexOf(keyWord) !== -1 && keyWord !== '') {
    let Reg = new RegExp(`${keyWord}`, 'gi')
    return val.replace(
      Reg,
      '<font color="#f00">' + keyWord + '</font>'
    )
  } else {
    return val
  }
}