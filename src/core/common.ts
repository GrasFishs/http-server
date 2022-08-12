export const enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
  HEADER,
}

export function getMethod(method: string) {
  return (
    {
      HEADER: HttpMethod.HEADER,
      GET: HttpMethod.GET,
      POST: HttpMethod.POST,
      PUT: HttpMethod.PUT,
      DELETE: HttpMethod.DELETE,
    }[method.toUpperCase()] || HttpMethod.GET
  );
}
