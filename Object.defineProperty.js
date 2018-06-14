let o = {}
//1 给o 添加一个属性a ,默认值为37
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
})
console.log(o); // { a: 37 }

//2 给对象添加一个属性 存取描述符
let bValue
Object.defineProperty(o, 'b', {
  get: function () {
    return bValue
  },
  set: function (newValue) {
    bValue = newValue
  },
  enumerable: true,
  configurable: true
})
console.log(o.b) // 调用get方法，但是b属性没有赋值 所以此时为undefined
o.b = 38 // 调用set方法 给b属性赋值38
console.log(o.b); // 38

// 3 方法一和方法二不能混用 descriptor中有set,get 就不能有value