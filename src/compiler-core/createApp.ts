import { createVNode } from './vnode'
import { Render, VNode } from '../runtime-dom/const'
export function createAppAPI(render: Render) {
	return function createApp(rootComponent) {
		// 这个app 就是 app实例
		const app = {
			_component: rootComponent,
			mount(rootContainer: Element) {
				// 这个是真正的挂载方法
				const node: VNode = createVNode(rootComponent)
				render(node, rootContainer)
			},
		}
		return app
	}
}
