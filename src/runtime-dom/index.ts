import { createRenderer } from '../compiler-core'
// import { DOMRenderer } from './const'
import {
	createElement,
	createText,
	setText,
	setElementText,
	patchProp,
	insert,
	remove,
} from './dom'

let renderer

function ensureRenderer() {
	// 如果有renderer 直接返回，没有就创建一个 renderer
	return (
		renderer ||
		createRenderer({
			createElement,
			createText,
			setText,
			setElementText,
			patchProp,
			insert,
			remove,
		})
	)
	// const createApp = (...args) => {}

	// return { createApp }
}

export const createApp = (...args) => {
	console.log('第一步，createApp')
	return ensureRenderer().createApp(...args)
}
