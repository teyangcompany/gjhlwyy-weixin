export default (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
