import { VNode } from '../runtime-dom/const'
export type Instance = {
	type: any // 可以是：// {template: '<p>{{msg}}</p>', setup: ƒ}
	vnode: VNode
	next: any
	props: Object
	parent: any
	provider: any
	proxy: any
	isMounted: boolean // 是否挂载
	attrs: any
	slots: any
	ctx: any // context 对象
	setupState: any // 存放 setup的返回值
	subTree?: any
	emit: () => void
	render?: () => void
	update?: () => void
}
