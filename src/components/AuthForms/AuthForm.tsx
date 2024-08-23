import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Input from "../Input/Input";
import { Button } from "../Button";
import { selectIsAuthenticated } from "../../slices/authSlice";

interface AuthField {
  id: "username" | "email" | "password";
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required: boolean;
}

interface AuthFormProps {
  title: string;
  submitText: string;
  onSubmit: (formData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void | string>;
  linkText: string;
  linkTo: string;
  linkLabel: string;
  fields: AuthField[];
  status: string;
  formError: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  submitText,
  onSubmit,
  linkText,
  linkTo,
  linkLabel,
  fields,
  status,
  formError,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      username: fields.find((field) => field.id === "username")?.value || "",
      email: fields.find((field) => field.id === "email")?.value || "",
      password: fields.find((field) => field.id === "password")?.value || "",
    };

    const result = await onSubmit(formData);
    if (result) {
      console.log(result);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Cuboid Map
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              {title}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <Input
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={field.label}
                  label={field.label}
                  required={field.required}
                />
              ))}
              <Button
                type="submit"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Processing..." : submitText}
              </Button>
              {formError && <p className="text-red-500">{formError}</p>}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {linkText}{" "}
                <Link
                  to={linkTo}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {linkLabel}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
