import { VNode } from '../runtime-dom/const'
import { shapeFlags } from '../shared'
export function createVNode(
	type: any,
	props?: any,
	children?: Array<any> | string
): VNode {
	console.log('createVnode', type, props, children)
	// if(type)
	const node = {
		el: null,
		component: null,
		key: props?.key,
		type: type,
		props: props || {},
		children,
		shapeFlag: getShapeFlag(type), // 组件的类型
	}

	// 基于 children 再次判断一下 shapeFlag类型
	if (Array.isArray(children)) {
		node.shapeFlag |= shapeFlags.ARRAY_CHILDREN
	} else if (typeof children === 'string') {
		node.shapeFlag |= shapeFlags.TEXT_CHILDREN
	}

	normalizeChildren(node, children)

	return node
}

export function normalizeChildren(node, children) {
	if (typeof children === 'object') {
		// 暂时主要是为了标识出 slots_children 这个类型来
		// 暂时我们只有 element 类型和 component 类型的组件
		// 所以我们这里除了 element ，那么只要是 component 的话，那么children 肯定就是 slots 了
		if (node.shapeFlag & shapeFlags.ELEMENT) {
			// 如果是 element 类型的话，那么 children 肯定不是 slots
		} else {
			// 这里就必然是 component 了,
			node.shapeFlag |= shapeFlags.SLOTS_CHILDREN
		}
	}
}

function getShapeFlag(type: any) {
	return typeof type === 'string'
		? shapeFlags.ELEMENT
		: shapeFlags.STATEFUL_COMPONENT
}

export const Text = Symbol('Text')
export const Fragment = Symbol('Fragment')
