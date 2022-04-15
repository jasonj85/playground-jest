import { SessionTokenDBAccess } from "../app/Authorization/SessionTokenDBAccess";
import { SessionToken } from "../app/Models/ServerModels";

describe("SessionTokenDBAccess suite", () => {
  let sessionTokenDBAccess: SessionTokenDBAccess;
  let sessionToken: SessionToken;

  const randonString = Math.random().toString(36).substring(7);

  beforeAll(() => {
    sessionTokenDBAccess = new SessionTokenDBAccess();
    sessionToken = {
      tokenId: randonString,
      accessRights: [1, 2, 3],
      expirationTime: new Date(),
      username: "userNameHere",
      valid: true,
    };
  });

  test("store and retrieve SessionToken", async () => {
    await sessionTokenDBAccess.storeSessionToken(sessionToken);
    const resultToken = await sessionTokenDBAccess.getToken(
      sessionToken.tokenId
    );
    expect(resultToken).toMatchObject(sessionToken);
  });

  test("delete SessionToken", async () => {
    await sessionTokenDBAccess.deleteToken(sessionToken.tokenId);
    const resultToken = await sessionTokenDBAccess.getToken(
      sessionToken.tokenId
    );
    expect(resultToken).toBeUndefined();
  });

  test("delete missing SessionToken throws error", async () => {
    try {
      await sessionTokenDBAccess.deleteToken(sessionToken.tokenId);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "Token not deleted");
    }
  });
});
