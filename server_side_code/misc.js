list = ["e", "123"]
function convert(v) {
  let temp = []
  v.forEach((item) => {
    isNaN(item) ? temp.push(Number(item)) : temp.push(item)
  })
  console.log(temp)
}
convert(list)