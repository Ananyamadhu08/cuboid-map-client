import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "../../hooks/useAuth";

const SignupForm: React.FC = () => {
  const { registerUser, status, error } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignup = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    setFormError(null);
    const result = await registerUser(formData);
    if (result) {
      setFormError(result);
    }
  };

  return (
    <AuthForm
      title="Create an account"
      submitText="Create an account"
      onSubmit={handleSignup}
      linkText="Already have an account?"
      linkTo="/login"
      linkLabel="Login here"
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

export default SignupForm;
