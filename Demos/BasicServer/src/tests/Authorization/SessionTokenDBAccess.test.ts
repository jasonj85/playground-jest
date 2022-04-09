import { SessionTokenDBAccess } from "../../app/Authorization/SessionTokenDBAccess";
import Nedb from "nedb";
import { SessionToken } from "../../app/Models/ServerModels";

jest.mock("nedb");

describe("SessionTokenDBAccess test suite", () => {
  let sessionTokenDBAccess: SessionTokenDBAccess;
  const nedbMock = {
    insert: jest.fn(),
    find: jest.fn(),
    loadDatabase: jest.fn(),
  };

  const someToken: SessionToken = {
    tokenId: "someTokenId",
    accessRights: [],
    username: "someUsername",
    valid: true,
    expirationTime: new Date(),
  };

  beforeEach(() => {
    sessionTokenDBAccess = new SessionTokenDBAccess(nedbMock as any);
    expect(nedbMock.loadDatabase).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("store sessionToken without errors", async () => {
    nedbMock.insert.mockImplementationOnce((someToken: any, cb: any) => {
      return cb();
    });

    await sessionTokenDBAccess.storeSessionToken(someToken);

    expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
  });

  test("store sessionToken with errors", async () => {
    nedbMock.insert.mockImplementationOnce((someToken: any, cb: any) => {
      return cb(new Error("something went wrong"));
    });

    await expect(
      sessionTokenDBAccess.storeSessionToken(someToken)
    ).rejects.toThrow("something went wrong");

    expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
  });
});
