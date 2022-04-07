import { Authorizer } from "../../app/Authorization/Authorizer";
import { SessionTokenDBAccess } from "../../app/Authorization/SessionTokenDBAccess";
import { UserCredentialsDbAccess } from "../../app/Authorization/UserCredentialsDbAccess";
import { Account, SessionToken } from "../../app/Models/ServerModels";

jest.mock("../../app/Authorization/SessionTokenDBAccess");
jest.mock("../../app/Authorization/UserCredentialsDbAccess");

describe("Authorizer test suite", () => {
  let authorizer: Authorizer;
  const sessionTokenDBAccessMock = {
    storeSessionToken: jest.fn(),
  };
  const userCredentialsDBAccessMock = {
    getUserCredential: jest.fn(),
  };

  beforeEach(() => {
    authorizer = new Authorizer(
      sessionTokenDBAccessMock as any,
      userCredentialsDBAccessMock as any
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const fakeAccount: Account = {
    username: "someperson",
    password: "123",
  };

  test("constructor arguments", () => {
    new Authorizer();
    expect(SessionTokenDBAccess).toBeCalled();
    expect(UserCredentialsDbAccess).toBeCalled();
  });

  test("should return sessionToken for valid credentials", async () => {
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0);
    jest.spyOn(global.Date, "now").mockReturnValueOnce(0);
    userCredentialsDBAccessMock.getUserCredential.mockReturnValue({
      username: "someperson",
      accessRights: [1, 3, 4],
      password: "123",
    });

    const expectedSessionToken: SessionToken = {
      username: "someperson",
      accessRights: [1, 3, 4],
      valid: true,
      tokenId: "",
      expirationTime: new Date(60 * 60 * 1000),
    };

    const sessionToken = await authorizer.generateToken(fakeAccount);
    expect(expectedSessionToken).toStrictEqual(sessionToken);
    expect(sessionTokenDBAccessMock.storeSessionToken).toHaveBeenCalledWith(
      sessionToken
    );
  });
});
