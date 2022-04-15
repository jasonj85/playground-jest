import React from "react";
import { LoginService } from "./services/LoginService";
import { CredentialsState, CustomEvent } from "./models/models";

export default function Login() {
  let loginLabel;

  const [credentials, setCredentials] = React.useState<CredentialsState>({
    username: "",
    password: "",
    isLoggedIn: false,
    loginAttempted: false,
  });

  const loginService: LoginService = new LoginService();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const loginResponse = await loginService.login(
      credentials.username,
      credentials.password
    );
    setCredentials({
      ...credentials,
      loginAttempted: true,
      isLoggedIn: loginResponse,
    });
  };

  const handleChange = (event: CustomEvent) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  if (credentials.loginAttempted) {
    if (credentials.isLoggedIn) {
      loginLabel = <label>Login successful</label>;
    } else {
      loginLabel = <label>Login failed</label>;
    }
  }

  return (
    <div>
      <form data-test="login-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          data-test="login-input"
          name="username"
          value={credentials.username}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          data-test="password-input"
          name="password"
          value={credentials.password}
          onChange={(e) => handleChange(e)}
          type="password"
        />
        <br />
        <input data-test="submit-button" type="submit" value="Login" />
        <br />
      </form>
      {loginLabel}
    </div>
  );
}
