import { LoginHandler } from "../../app/Handlers/LoginHandler";
import {
  HTTP_CODES,
  HTTP_METHODS,
  SessionToken,
} from "../../app/Models/ServerModels";
import { Utils } from "../../app/Utils/Utils";

describe("LoginHandler test suite", () => {
  let loginHandler: LoginHandler;

  const requestMock = {
    method: "",
  };
  const responseMock = {
    writeHead: jest.fn(),
    write: jest.fn(),
    statusCode: 0,
  };
  const authorizerMock = {
    generateToken: jest.fn(),
  };
  const getRequestBodyMock = jest.fn();

  beforeEach(() => {
    loginHandler = new LoginHandler(
      requestMock as any,
      responseMock as any,
      authorizerMock as any
    );

    Utils.getRequestBody = getRequestBodyMock;
    requestMock.method = HTTP_METHODS.POST;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const fakeSessionToken: SessionToken = {
    tokenId: "fakeToken",
    username: "fakeUserName",
    valid: true,
    expirationTime: new Date(),
    accessRights: [1, 2, 3],
  };

  test("options request", async () => {
    requestMock.method = HTTP_METHODS.OPTIONS;
    await loginHandler.handleRequest();

    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.OK);
  });

  test("not handled http method", async () => {
    requestMock.method = "randomMethodHere";
    await loginHandler.handleRequest();

    expect(responseMock.writeHead).not.toHaveBeenCalled();
  });

  test("post request with valid login", async () => {
    getRequestBodyMock.mockReturnValueOnce({
      username: "user",
      password: "123",
    });
    authorizerMock.generateToken.mockReturnValueOnce(fakeSessionToken);

    await loginHandler.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });
    expect(responseMock.write).toBeCalledWith(JSON.stringify(fakeSessionToken));
  });

  test("post request with invalid login", async () => {
    getRequestBodyMock.mockReturnValueOnce({
      username: "user",
      password: "123",
    });
    authorizerMock.generateToken.mockReturnValueOnce(null);

    await loginHandler.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
    expect(responseMock.write).toBeCalledWith("wrong username or password");
  });

  test("post request with unexpected error", async () => {
    const errorMessage = "unexpected error";
    getRequestBodyMock.mockRejectedValueOnce(new Error("unexpected error"));

    await loginHandler.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.INTERNAL_SERVER_ERROR);
    expect(responseMock.write).toBeCalledWith(
      "Internal error: " + errorMessage
    );
  });
});
