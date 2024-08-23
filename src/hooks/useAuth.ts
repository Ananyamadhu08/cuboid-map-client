import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z, ZodError } from "zod";

import { RootState, AppDispatch } from "../app/store";
import { login, logout, register } from "../slices/authSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accessToken, refreshToken, user, status, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const loginUser = useCallback(
    async (credentials: {
      username: string;
      email: string;
      password: string;
    }) => {
      try {
        loginSchema.parse(credentials);
        await dispatch(login(credentials)).unwrap();
      } catch (e) {
        if (e instanceof ZodError) {
          return e.errors.map((err) => err.message).join(", ");
        }
        return "An unknown error occurred";
      }
    },
    [dispatch],
  );

  const registerUser = useCallback(
    async (userInfo: { username: string; email: string; password: string }) => {
      try {
        registerSchema.parse(userInfo);
        await dispatch(register(userInfo)).unwrap();
      } catch (e) {
        if (e instanceof ZodError) {
          return e.errors.map((err) => err.message).join(", ");
        }
        return "An unknown error occurred";
      }
    },
    [dispatch],
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    accessToken,
    refreshToken,
    user,
    status,
    error,
    loginUser,
    registerUser,
    logoutUser,
  };
};
