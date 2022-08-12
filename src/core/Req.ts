import { HttpMethod, getMethod } from "./common";
import { HttpHeader } from "./Header";
import { HttpConnection, HttpServer } from "./Http";

export class HttpRequest {
  method = HttpMethod.GET;
  version = "";
  uri = "/";

  header = new HttpHeader();

  bodyRaw = "";

  private lines: string[] = [];

  public constructor(
    private http: HttpServer,
    private connection: HttpConnection
  ) {}

  public parse(raw: string) {
    this.lines = raw.split("\r\n");
    this.parseStartLine(this.lines[0]);
    const index = this.lines.findIndex((l) => l === "");
    this.header.fromMessage(this.lines.slice(0, index));
    this.parseBody(this.lines.slice(index).join(""));
  }

  private parseStartLine(line: string) {
    const [method, uri, version] = line.split(/\s/);
    this.method = getMethod(method);
    this.uri = uri;
    this.version = version;
  }

  private parseBody(raw: string) {
    this.bodyRaw = raw;
  }
}
