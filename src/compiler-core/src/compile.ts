import { baseParse } from './parse'
import { generate } from './codegen'
import { transform } from './transform'
import { transformElement } from './transform/transformElement'
import { transformText } from './transform/transformText'

export function baseCompile(template, options: Object): { code: any } {
	console.log('baseCompile template', template)
	const ast = baseParse(template)
	console.log('ast', ast)
	// 2. 给 ast 加点料（- -#）
	transform(
		ast,
		Object.assign(options, {
			nodeTransforms: [transformElement, transformText],
		})
	)

	console.log('nowast', ast)

	return generate(ast)
}
