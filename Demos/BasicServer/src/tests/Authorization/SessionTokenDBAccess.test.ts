import { SessionTokenDBAccess } from "../../app/Authorization/SessionTokenDBAccess";
import Nedb from "nedb";

jest.mock("nedb");

describe("SessionTokenDBAccess test suite", () => {
  let sessionTokenDBAccess: SessionTokenDBAccess;
  const nedbMock = {
    insert: jest.fn(),
    find: jest.fn(),
    loadDatabase: jest.fn(),
  };

  const someToken: SessionToken = {};

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
  });
});
