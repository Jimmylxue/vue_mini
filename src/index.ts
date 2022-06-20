// export * from './runtime-dom'
import { createApp } from './runtime-dom'
import { registerRuntimeCompiler } from './runtime-dom'
import { baseCompile } from './compiler-core/src'
// console.log('createApp', createApp)
// export { createApp }

/**
 * 在整个项目入口，就通过函数传参（回调函数） 传递给 runtime-core
 * 	因为获取 vnode 以及template 是在 runtime-core中获取的
 *  */
function compileToFunction(template, options = {}) {
	console.log('hello world', template, options)
	// console.log('template!!!!!!!', template)
	const { code } = baseCompile(template, options)
	// // 调用 compile 得到的代码在给封装到函数内，
	// // 这里会依赖 runtimeDom 的一些函数，所以在这里通过参数的形式注入进去
	alert(code)
	const render = new Function('Vue', code)()
	console.log(render, 'render!!!!')
	return render
}

registerRuntimeCompiler(compileToFunction)

const vue_mini = {
	createApp,
}

export default vue_mini
