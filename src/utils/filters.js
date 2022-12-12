// 过滤关键字
export function filterKeyWord (val, keyWord = '(变异)') {
  if (!val) return
  if (val.indexOf(keyWord) !== -1 && keyWord !== '') {
    return val.replace(
      keyWord,
      '<font color="#f00">' + keyWord + '</font>'
    )
  } else {
    return val
  }
}