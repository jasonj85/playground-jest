import { Utils } from "../app/Utils/Utils";
import { IncomingMessage } from "http";

describe("Utils test suite", () => {
  test("getRequestPath valid request", () => {
    const request = {
      url: "http://localhost:8000/login",
    } as IncomingMessage;

    const resultPath = Utils.getRequestBasePath(request);
    expect(resultPath).toBe("login");
  });

  test("getRequestPath with no path name", () => {
    const request = {
      url: "http://localhost:8000/",
    } as IncomingMessage;

    const resultPath = Utils.getRequestBasePath(request);
    expect(resultPath).toBeFalsy();
  });
});