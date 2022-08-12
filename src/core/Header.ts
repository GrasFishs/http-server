export class HttpHeader {
  private headers = new Map<string, string | string[]>();

  public setHeader(key: string, value: string | number) {
    this.headers.set(key.toLowerCase(), value.toString());
  }

  public getHeader(key: string) {
    return this.headers.get(key);
  }

  public toMessage() {
    let str = "";
    for (const [key, value] of this.headers) {
      str += `${key}:${value}\r\n`;
    }
    return str;
  }

  public fromMessage(lines: string[]) {
    lines.forEach((line) => {
      if (line.includes(":")) {
        const [key, value] = line.split(":");
        this.setHeader(key, value);
      }
    });
  }
}
