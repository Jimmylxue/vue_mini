import { createVNode } from './vnode'
import { Render, VNode } from '../runtime-dom/const'
export function createAppAPI(render: Render) {
	return function createApp(rootComponent) {
		console.log('rootComponent', rootComponent)
		// rootComponent 其实就是 createApp() 执行时传入的配置项
		// 这个app 就是 app实例
		const app = {
			_component: rootComponent,
			mount(rootContainer: Element) {
				// 这个是真正的挂载方法
				const node: VNode = createVNode(rootComponent) // 根据配置项 创建一个 vnode
				render(node, rootContainer)
			},
		}
		return app
	}
}
