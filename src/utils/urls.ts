export function buildQueryString(params: {[key: string]: any}) {
  return Object.keys(params)
    .map((key) => [key, params[key]] as [string, any])
    .map((pair) => pair.map(encodeURIComponent))
    .map((pair) => pair.join('='))
    .join('&');
}

export function buildUrl(baseUrl: string, params: {[key: string]: any}) {
  return `${baseUrl}?${buildQueryString(params)}`;
}
