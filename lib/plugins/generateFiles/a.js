
console.log = (function() {
  return function() {
    if(true) {}
    log.call(console, ...arguments)
  }
})(console.log)

let oldMap = Array.prototype.map

Array.prototype.map = function(fn) {
  console.log('dd', this)
  oldMap.call(this, ...arguments)
}
let aa = [1, 2].map((k) => {
  return k + 1
})
console.log(aa)