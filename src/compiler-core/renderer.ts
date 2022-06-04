import { createAppAPI } from './createApp'
import { DOMRenderer, Render, VNode } from '../runtime-dom/const'

export function createRenderer(options: DOMRenderer) {
	const render: Render = (vnode: VNode, container) => {
		console.log('vnode', vnode, 'container', container)
		patch(null, vnode, container)
	}

	// patch 触发更新和挂载的关键方法！
	function patch(node1, node2: VNode, container) {
		const { type, shapeFlag } = node2
		if (!node1) {
			// node1 不存在，是挂载
			console.log('node1 不存在，是挂载')
		} else {
			console.log('是更新操作')
		}
	}

	return {
		createApp: createAppAPI(render),
	}
}
