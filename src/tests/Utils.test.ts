import { Utils } from "../app/Utils";

describe("Utils test suite", () => {
  beforeEach(() => {
    console.log("beforeEach");
  });

  beforeAll(() => {
    console.log("before all ");
  });

  test("first test", () => {
    const result = Utils.toUpperCase("abc");

    expect(result).toBe("ABC");
  });

  test("parse a URL", () => {
    const parsedUrl = Utils.parseUrl("http://localhost:8080/test?a=1&b=2");

    expect(parsedUrl.href).toBe("http://localhost:8080/test?a=1&b=2");
    expect(parsedUrl.port).toBe("8080");
    expect(parsedUrl.hostname).toBe("localhost");
    expect(parsedUrl.pathname).toBe("/test");
    expect(parsedUrl.search).toBe("?a=1&b=2");
    expect(parsedUrl.query.a).toBe("1");
  });

  test("test invalid url", () => {
    function expectError() {
      Utils.parseUrl("");
    }
    expect(expectError).toThrowError();
  });
});
