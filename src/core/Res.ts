import { HttpHeader } from "./Header";
import { HttpConnection, HttpServer } from "./Http";
import { StatusCode } from "./types/Status";

export class HttpResponse {
  constructor(private http: HttpServer, private connection: HttpConnection) {}
  private statusCode = StatusCode.OK;
  private statusDesc = StatusCode[StatusCode.OK];

  private body = "";

  private header = new HttpHeader();

  public status(st: StatusCode) {
    this.statusCode = st;
    this.statusDesc = StatusCode[st].split("_").join(" ");
    return this;
  }

  public setHeaders(header: Map<string, string | number>) {
    header.forEach((value, key) => {
      this.header.setHeader(key, value);
    });
    return this;
  }

  public setHeader(key: string, value: string | number) {
    this.header.setHeader(key, value);
    return this;
  }

  public raw(body: string, contentType = "text/plain") {
    this.body = body;
    this.header.setHeader("Content-Type", contentType);
    this.header.setHeader("Content-Length", body.length);
    return this.connection.send(this.toString());
  }

  public json(body: object) {
    return this.raw(JSON.stringify(body), "application/json");
  }

  public toString() {
    const firstLine = `HTTP/${this.http.version} ${this.statusCode} ${this.statusDesc}\r\n`;
    const headers = this.header.toMessage();
    return `${firstLine}${headers}\r\n${this.body}`;
  }
}
