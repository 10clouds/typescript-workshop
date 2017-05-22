export type QueryParams = {[key: string]: string|number};

export function buildQueryString(params: QueryParams) {
	return ( 
		Object
		.keys(params)
		.map((key) => [key, params[key]])
		.map((pair) => pair.map(encodeURIComponent))
		.map((pair) => pair.join('='))
		.join('&')
	);
}

export function buildUrl(baseUrl: string, params: QueryParams) {
	return `${baseUrl}?${buildQueryString(params)}`;
}
