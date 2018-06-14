# defineProperty
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。  
Object.defineProperty(obj, prop, descriptor)  
Object.defineProperty(被修改的对象, 对象上的属性, 属性的描述)  
先来个最简单的示例热热身
```js
let o = {}
//1 给o 添加一个属性a ,默认值为37
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
})
console.log(o); // { a: 37 }
```
## 1.1属性的描述
属性描述符有两种形式<font color='green'></font>
- 1.<font color='green'>数据描述符</font>有四个可选参数  

| 参数名  | 描述|
| ------------- | ------------- |
| configurable  | 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。  |
| enumerable  | 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。  |
|value|该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。|
|writable|当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。|
|
- 2 <font color='green'>存取描述符</font>

| 参数名  | 描述|
| ------------- | ------------- |
| configurable  | 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。  |
| enumerable  | 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。  |
|get|一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined|
|set|一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined|
|
### 1.1.1 数据描述符

```js
let o = {}
//1 给o 添加一个属性a ,默认值为37
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
})
console.log(o); // { a: 37 }
```

### 1.1.2存取描述符
```js
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
```
### 1.1.3注意不允许上面二者混用
也就是说descriptor中有set,get 就不能有value

## 1.2 属性描述的各个属性的详细示例
### 1.2.1 writable属性
如果属性已经存在，Object.defineProperty()将尝试根据描述符中的值以及对象当前的配置来修改这个属性。如果旧描述符将其configurable 属性设置为false，则该属性被认为是“不可配置的”，并且没有属性可以被改变（除了单向改变 writable 为 false）。当属性不可配置时，不能在数据和访问器属性类型之间切换。

```js
var o = {};
Object.defineProperty(o, 'a', {
  value: 37,
  writable: false
});

console.log(o.a); // 37
o.a = 25; // 试图修改o.a
console.log(o.a); // 37 没修改成功，因为writable: false
```

###1.2.2 Enumerable 特性
enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。

```js
var o = {};
Object.defineProperty(o, "a", { value : 1, enumerable:true });
Object.defineProperty(o, "b", { value : 2, enumerable:false });
Object.defineProperty(o, "c", { value : 3 }); // enumerable defaults to false
o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

for (var i in o) {    
  console.log(i);  
}
// 打印 'a' 和 'd' (in undefined order)

Object.keys(o); // ["a", "d"]

o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // false
```
###1.2.3 Configurable 特性
configurable特性表示对象的属性是否可以被删除，以及除writable特性外的其他特性是否可以被修改。

```js
var o = {};
Object.defineProperty(o, "a", { get : function(){return 1;}, 
  configurable : false } );

// throws a TypeError
Object.defineProperty(o, "a", {configurable : true}); 
// throws a TypeError
Object.defineProperty(o, "a", {enumerable : true}); 
// throws a TypeError (set was undefined previously) 
Object.defineProperty(o, "a", {set : function(){}}); 
// throws a TypeError (even though the new get does exactly the same thing) 
Object.defineProperty(o, "a", {get : function(){return 1;}});
// throws a TypeError
Object.defineProperty(o, "a", {value : 12});

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
```
