import * as axios from "axios";
import {
  HTTP_CODES,
  UserCredentials,
  SessionToken,
} from "../app/Models/ServerModels";
import { UserCredentialsDbAccess } from "../app/Authorization/UserCredentialsDbAccess";
axios.default.defaults.validateStatus = () => true;

const serverUrl = "http://localhost:8080";
const itestUserCredentials: UserCredentials = {
  accessRights: [1, 2, 3],
  username: "itestuser",
  password: "itestpass",
};

describe("Server itest suite", () => {
  let userCredentialsDbAccess: UserCredentialsDbAccess;
  let sessionToken: SessionToken;

  beforeAll(() => {
    userCredentialsDbAccess = new UserCredentialsDbAccess();
  });

  test("server reachable", async () => {
    const response = await axios.default.options(serverUrl);
    expect(response.status).toBe(HTTP_CODES.OK);
  });

  test.skip("put credentials inside database", async () => {
    await userCredentialsDbAccess.putUserCredential(itestUserCredentials);
  });

  test("reject invalid credentials", async () => {
    const response = await axios.default.post(serverUrl + "/login", {
      username: "invalid",
      password: "invalid",
    });

    expect(response.status).toBe(HTTP_CODES.NOT_fOUND);
  });

  test("test login works with correct credentials", async () => {
    const response = await axios.default.post(serverUrl + "/login", {
      username: itestUserCredentials.username,
      password: itestUserCredentials.password,
    });

    expect(response.status).toBe(HTTP_CODES.CREATED);
    sessionToken = response.data;
  });

  test("query data", async () => {
    const response = await axios.default.get(serverUrl + "/users?name=some", {
      headers: {
        Authorization: sessionToken.tokenId,
      },
    });

    expect(response.status).toBe(HTTP_CODES.OK);
  });
});

// Not being used atm
async function serverReachable(): Promise<boolean> {
  try {
    await axios.default.get(serverUrl);
    return true;
  } catch (error) {
    console.log("server not reachable");
    return false;
  }
}
