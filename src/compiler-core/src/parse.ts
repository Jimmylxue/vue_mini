type TContent = {
	source: string
}

export function baseParse(template: string) {
	const context = createParserContext(template)
	return createRoot(parseChildren(context, []))
}

function createParserContext(template: string) {
	return {
		source: template,
	}
}

function parseChildren(context: TContent, ancestors: any) {
	console.log('开始解析 children')
}

function createRoot(context) {}
