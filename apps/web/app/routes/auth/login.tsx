import { useState } from "react";
import { Form } from "react-router";
import { authClient } from "~/lib/auth-client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: _ctx => {
          // TODO: Show loading
        },
        onSuccess: ({ data }) => {
          // TODO: Redireot to home
          console.log(data);
        },
        onError: ({ error }) => {
          // TODO: Show error
          console.error(error);
        },
      },
    );
  };

  return (
    <div>
      <h2>Sign In</h2>
      <Form onSubmit={signIn}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </Form>
    </div>
  );
}
