import { createAppAPI } from './createApp'
import { DOMRenderer, Render, VNode } from '../runtime-dom/const'
import { Text, Fragment } from './vnode'
import { shapeFlags } from '../shared'

export function createRenderer(options: DOMRenderer) {
	const render: Render = (vnode: VNode, container) => {
		console.log('vnode', vnode, 'container', container)
		patch(null, vnode, container)
	}

	// patch 触发更新和挂载的关键方法！
	function patch(node1, node2: VNode, container) {
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
				}
		}
		// if (!node1) {
		// 	// node1 不存在，是挂载
		// 	console.log('node1 不存在，是挂载')

		// } else {
		// 	console.log('是更新操作')
		// }
	}

	return {
		createApp: createAppAPI(render),
	}
}
