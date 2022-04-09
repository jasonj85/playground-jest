import { mocked } from "ts-jest/utils";
import { Launcher } from "../app/Launcher";
import { Server } from "../app/Server/Server";

jest.mock("../app/Server/Server", () => {
  return {
    Server: jest.fn(() => {
      return {
        startServer: () => {
          console.log("starting dummy server");
        },
      };
    }),
  };
});

describe("SessionTokenDBAccess test suite", () => {
  const mocekdServer = mocked(Server, true);
  test("create server", () => {
    new Launcher();
    expect(mocekdServer).toBeCalled();
  });

  test("launch app", () => {
    const launcherAppMock = jest.fn();
    Launcher.prototype.launchApp = launcherAppMock;

    new Launcher().launchApp();
    expect(launcherAppMock).toBeCalled();
  });
});
