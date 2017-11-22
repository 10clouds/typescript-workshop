export function buildQueryString(params: any): string {
  return Object.keys(params)
    .map((key) => [key, params[key]])
    .map((pair) => pair.map(encodeURIComponent))
    .map((pair) => pair.join('='))
    .join('&');
}

export function buildUrl(baseUrl: string, params: any): string {
  return `${baseUrl}?${buildQueryString(params)}`;
}
