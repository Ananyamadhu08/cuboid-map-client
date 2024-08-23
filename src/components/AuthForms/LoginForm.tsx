import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "../../hooks/useAuth";

const LoginForm: React.FC = () => {
  const { loginUser, status, error } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    setFormError(null);
    const result = await loginUser(formData);
    if (result) {
      setFormError(result);
    }
  };

  return (
    <AuthForm
      title="Sign in to your account"
      submitText="Sign in"
      onSubmit={handleLogin}
      linkText="Don’t have an account yet?"
      linkTo="/signup"
      linkLabel="Sign up"
      fields={[
        {
          id: "username",
          label: "Your username",
          type: "text",
          value: username,
          onChange: (e) => setUsername(e.target.value),
          required: true,
        },
        {
          id: "email",
          label: "Your email",
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
        },
      ]}
      status={status}
      formError={formError || error}
    />
  );
};

export default LoginForm;
