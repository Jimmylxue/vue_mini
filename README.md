# render_base

这一部分的主要是理清一个应用实例从 `createApp` 执行之后是如果渲染到我们看到的页面上的，其重点是在`runtime-dom`和`runtime-core`两个包之间的一些初始化操作。

为了将各个部分功能尽可能的拆分开来，这个分支最终渲染到页面并未执行一些编译与响应式系统的操作，主要就是为了理解什么是 vue 的`vnode`、`instance`、`context` 以及 `render`渲染函数的概念。

理解他们最好的办法就是知道他们这些对象里面到底有啥属性，分别是干啥的。

```ts
export type VNode = {
	el: any // 放的其实就是元素
	component?: Instance // 其实就是实例 instance
	key: any
	type: any // {template: '<p>{{msg}}</p>', setup: ƒ}
	shapeFlag: shapeFlags // Vnode的类型
	props: Object
	children: Array<any> | string
}
```

instance 实例，大部分的应该都是比较熟悉的

```ts
export type Instance = {
	type: any // 可以是：// {template: '<p>{{msg}}</p>', setup: ƒ}
	vnode: VNode
	next: any
	props: Object
	parent: any
	provider: any
	proxy: any
	isMounted: boolean // 是否挂载
	attrs: any
	slots: any
	ctx: any // context 对象，主要是暴露给用户使用的东西存这里
	setupState: any // 存放 setup的返回值
	emit: () => void
	render?: () => void
	update?: () => void
}
```

ctx 实例，主要是暴露给用户使用的，像是插槽呀，`attrs`属性集合等等。

```ts
export type Ctx = {
	attrs: Instance.attrs
	slots: Instance.slots
	emit: Instance.emit
}
```

**总结**

最后简单的过一下初次渲染中这一部分的主要流程是啥：

- 通过`createApp` 方法会创建一个 app 实例，实例上有`mount()`挂载方法，根据`createApp`方法传入的配置项创建一个`vnode`。

  将这个`vnode`和 `mount()`传递的 DOM 根节点一起传入 `render`渲染函数进行页面的渲染

- 因为是首次挂载，所以 render 函数会将 这个`vnode`，渲染到宿主 DOM 中，这里会执行到`mountComponent()`挂载组件函数中，这个函数做了以下几件事情：

  - 先创建一个组件实例`instance`
  - 给组件的实例`instance`加工一下，绑定`props`、`ctx`、添加组件的`render`渲染函数。
  - 根据组件中的`inMounted`值判断组件是否挂载过，如果挂载过就执行更新操作，如果未挂载过就执行初次渲染操作，执行结束之后将`isMounted`设置为`true`.
  - `instance.update`接入`reactivity`响应式系统，所以会长存，发生一些响应式值变化时会自动触发`componentUpdateFn()`方法。

**下一步学习**

**compile** 编译模块
