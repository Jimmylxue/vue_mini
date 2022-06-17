import { VNode } from '../runtime-dom/const'
import { Instance } from '../shared'
import { PublicInstanceProxyHandlers } from './componentPublicInstance'
export function createComponentInstance(instanceParams: {
	node: VNode
	parentComponent: any
}) {
	const { node, parentComponent } = instanceParams
	const instance = {
		type: node.type, //暂时可以理解为一个配置对象
		vnode: node,
		next: null,
		props: {},
		parent: parentComponent,
		provider: {},
		proxy: null,
		isMounted: false, // 是否挂载
		attrs: {}, // 属性集合
		slots: {}, //插槽数据
		ctx: {}, //context 对象
		setupState: {}, // 存放setup的返回值
		emit: () => {},
	}

	instance.ctx = {
		_: instance,
	}

	return instance
}

// 加工实例
export function setupComponent(instance: Instance) {
	// todo... 处理props

	// todo... 处理slot

	// 源码里面有两种类型的 component
	// 一种是基于 options 创建的
	// 还有一种是 function 的
	// 这里处理的是 options 创建的
	// 叫做 stateful 类型
	setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: Instance) {
	// 县创建代理 proxy
	console.log('创建 proxy')
	console.log('现在的实例', instance)
	instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)

	const Component = instance.type //暂时理解成配置信息

	const { setup } = Component
	if (setup) {
		console.log('配置对象中有 setup')
		setCurrentInstance(instance) // 先简单存一下

		const setupContext = createSetupContext(instance)

		// const setupResult = setup&&setup()

		setCurrentInstance(null) // 处理结束之后清空

		// 处理setupResult
		// handleSetupResult(instance, setupResult)
		handleSetupResult(instance, { msg: 'vue3——compiler' })
	} else {
		console.log('配置对象中无 setup 可能是optionAPI')
	}
}

function handleSetupResult(instance: Instance, setupResult) {
	if (typeof setupResult === 'function') {
		// 如果返回的是 function 的话，那么绑定到 render 上
		// 认为是 render 逻辑
		// setup(){ return ()=>(h("div")) }
		instance.render = setupResult
	} else if (typeof setupResult === 'object') {
		// 这里先简单放一下吧 后面是要接入响应式系统的
		instance.setupState = setupResult
	}

	finishComponentSetup(instance)
}

function finishComponentSetup(instance: Instance) {
	// 给 instance 设置 render
	console.log('here~~~~~~~~~~~~~')
	// 先取到用户设置的 component options
	const Component = instance.type
	if (!instance.render) {
		// 如果 compile 有值 并且当然组件没有 render 函数，那么就需要把 template 编译成 render 函数
		// 之所以这样 是因为 组件的配置项是可以直接写 render函数的
		if (compile && !Component.render) {
			// console.log('ccdd')
			if (Component.template) {
				// 实例的配置项中有配置 template
				const template = Component.template
				// 为组件绑定一个 render 渲染函数
				Component.render = compile(template)
			}
		}

		// 如果配置项中直接有 render函数 则直接绑定即可
		instance.render = Component.render
	}
}

let currentInstance = {}

export function setCurrentInstance(instance) {
	currentInstance = instance
}

function createSetupContext(instance: Instance) {
	console.log(
		'初始化 setup的context，这一步实际上是将 instance实例上的一些内容放到 ctx 上'
	)
	return {
		attrs: instance.attrs,
		slots: instance.slots,
		emit: instance.emit,
	}
}

let compile
export function registerRuntimeCompiler(_compile) {
	compile = _compile
}
