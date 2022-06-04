import { shapeFlags } from '../shared'

export type DOMRenderer = {
	createElement: () => void
	createText: () => void
	setText: () => void
	setElementText: () => void
	patchProp: () => void
	insert: () => void
	remove: () => void
}

export type VNode = {
	el: any
	component: any
	key: any
	type: any
	shapeFlag: shapeFlags
	props: Object
	children: Array<any> | string
}

export type Render = (node: VNode, DOMSelector: Element) => void

// const a:DOMRenderer = {
//   createElement
// }
