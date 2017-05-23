type ParamsType = {[name: string]: string | number};

export function buildQueryString(params: ParamsType): string {
  return Object.keys(params)
    .map((key) => [key, params[key]])
    .map((pair) => pair.map(encodeURIComponent))
    .map((pair) => pair.join('='))
    .join('&');
}

export function buildUrl(baseUrl: string, params: ParamsType): string {
  return `${baseUrl}?${buildQueryString(params)}`;
}
