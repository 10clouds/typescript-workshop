export function buildQueryString(params) {
	return ( 
		Object
		.keys(params)
		.map((key) => [key, params[key]])
		.map((pair) => pair.map(encodeURIComponent))
		.map((pair) => pair.join('='))
		.join('&')
	);
}

export function buildUrl(baseUrl, params) {
	return `${baseUrl}?${buildQueryString(params)}`;
}
