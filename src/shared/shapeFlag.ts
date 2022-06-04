export enum shapeFlags {
	// element 元素类型
	ELEMENT = 1,
	// 组件类型
	STATEFUL_COMPONENT,
	// vnode 中 children为 string 类型
	TEXT_CHILDREN,
	// vnode 中 children为 array 类型
	ARRAY_CHILDREN,
	// slot类型
	SLOTS_CHILDREN,
}
