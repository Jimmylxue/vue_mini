import { baseParse } from './parse'
import { generate } from './codegen'
import { transform } from './transform'

export function baseCompile(template, options: Object): { code: any } {
	console.log('baseCompile template', template)
	const ast = baseParse(template)

	return {
		code: () => {
			alert(111)
		},
	}
}
