import { createAppAPI } from './createApp'
import { DOMRenderer, Render, VNode } from '../runtime-dom/const'
import { Text, Fragment } from './vnode'
import { createComponentInstance, setupComponent } from './component'
import { Instance, shapeFlags } from '../shared'

export function createRenderer(options: DOMRenderer) {
	const render: Render = (vnode: VNode, container) => {
		console.log('vnode', vnode, 'container', container)
		patch(null, vnode, container)
	}

	// patch 触发更新和挂载的关键方法！
	function patch(
		node1,
		node2: VNode,
		container,
		anchor = null,
		parentComponent = null
	) {
		const { type, shapeFlag } = node2
		console.log('type', type)
		switch (type) {
			case Text:
				console.log('处理text')
				break
			case Fragment:
				console.log('处理 Fragment')
				break
			default:
				if (shapeFlag & shapeFlags.ELEMENT) {
					console.log('处理element')
				} else if (shapeFlag & shapeFlags.STATEFUL_COMPONENT) {
					console.log('处理组件')
					processComponent(node1, node2, container, parentComponent)
				}
		}
		// if (!node1) {
		// 	// node1 不存在，是挂载
		// 	console.log('node1 不存在，是挂载')

		// } else {
		// 	console.log('是更新操作')
		// }
	}

	function processComponent(node1, node2: VNode, container, parentComponent) {
		if (!node1) {
			console.log('执行的是挂载的过程')
			// 挂载只需要 node2 也就是新的 vnode就可以了
			mountComponent(node2, container, parentComponent)
		} else {
			console.log('执行的是更新的过程')
			updateComponent()
		}
	}

	// 挂载组件
	function mountComponent(node2: VNode, container, parentComponent) {
		// 先创建一个组件实例
		const instance = (node2.component = createComponentInstance({
			node: node2,
			parentComponent,
		}))
		/**
		 * type 可以是： {template: '<p>{{msg}}</p>', name: 'first_render', setup: ƒ}
		 * 组件配置都有一个name属性，表示的是组件的名字 都在type里面
		 */
		//
		console.log(`创建组件实例:${instance.type.name}`)
		// 2. 给 instance 加工加工
		/**
		 * 绑定 proxy
		 * 绑定 ctx
		 * 添加 组件的 render渲染函数
		 */
		setupComponent(instance)

		setupRenderEffect(instance, node2, container)
	}

	function setupRenderEffect(
		instance: Instance,
		initialVNode: VNode,
		container: Element
	) {
		console.log('编译前的数据', instance, initialVNode, container)
		// container.textContent =
		// 调用 render
		// 应该传入 ctx 也就是 proxy
		// ctx 可以选择暴露给用户的 api
		// 源代码里面是调用的 renderComponentRoot 函数
		// 这里为了简化直接调用 render
		// obj.name  = "111"
		// obj.name = "2222"
		// 从哪里做一些事
		// 收集数据改变之后要做的事 (函数)
		// 依赖收集   effect 函数
		// 触发依赖
		function componentUpdateFn() {
			if (!instance.isMounted) {
				// 这里就先简单的渲染出来吧~ 等看完编译模块和 响应式模块了再继续往这里深入写
				container.textContent = instance.setupState.msg
				instance.isMounted = true
			} else {
				// 执行更新 响应式数据如果发生变化会走这里
			}
		}

		componentUpdateFn() // 先手动执行一次， 后面如果发生变化会自动触发这里

		// 这里将来接入 effect 响应式数据 所以 instance 实例会长存
		instance.update = () => {}
	}

	function updateComponent() {}

	return {
		createApp: createAppAPI(render),
	}
}
