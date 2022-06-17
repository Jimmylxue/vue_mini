import { baseParse } from './parse'

export function baseCompile(template, options: Object): { code: any } {
	console.log('baseCompile template', template)
	const ast = baseParse(template)

	return {
		code: 'hello world',
	}
}
