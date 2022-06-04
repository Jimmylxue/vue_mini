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
	type: string
	shapeFlag: string
}

export type Render = (node: VNode, DOMSelector: Element) => void

// const a:DOMRenderer = {
//   createElement
// }
