import net, { Socket } from "net";
import { HttpRequest } from "./Req";
import { HttpResponse } from "./Res";

type Callback = (req: HttpRequest, res: HttpResponse) => void;

export class HttpServer {
  private callback!: Callback;
  constructor(public version = "1.1") {}
  public createServer(callbackListener: Callback) {
    this.callback = callbackListener;
  }

  public listen(port: number | string, cb: () => void) {
    if (!this.callback) {
      throw new Error("not createServer before listen");
    }
    const server = net.createServer((socket) => {
      const connection = new HttpConnection(socket);
      const req = new HttpRequest(this, connection);
      const res = new HttpResponse(this, connection);
      socket.on("data", (data) => {
        req.parse(data.toString());
        this.callback(req, res);
      });
    });
    server.listen(port, cb);
  }
}

export class HttpConnection {
  constructor(private socket: Socket | null) {}

  public send(msg: string) {
    this.socket?.write(msg);
  }
}
