export function buildQueryString(params: object) {
  const foo = params['foo'];

  return Object.keys(params)
    .map((key) => [key, params[key]])
    .map((pair) => pair.map(encodeURIComponent))
    .map((pair) => pair.join('='))
    .join('&');
}

export function buildUrl(baseUrl: string, params: object) {
  return `${baseUrl}?${buildQueryString(params)}`;
}
