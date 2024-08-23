import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z, ZodError } from "zod";
import { RootState, AppDispatch } from "../app/store";
import { login, logout, register } from "../slices/authSlice";

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type AuthCredentials = z.infer<typeof authSchema>;

const validateAuth = (credentials: AuthCredentials) => {
  try {
    authSchema.parse(credentials);
    return null;
  } catch (e) {
    if (e instanceof ZodError) {
      return e.errors.map((err) => err.message).join(", ");
    }
    return "An unknown error occurred";
  }
};

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
      const validationError = validateAuth(credentials);
      if (validationError) return validationError;
      try {
        await dispatch(login(credentials)).unwrap();
      } catch {
        return "An error occurred while logging in";
      }
    },
    [dispatch],
  );

  const registerUser = useCallback(
    async (userInfo: { username: string; email: string; password: string }) => {
      const validationError = validateAuth(userInfo);
      if (validationError) return validationError;
      try {
        await dispatch(register(userInfo)).unwrap();
      } catch {
        return "An error occurred while registering";
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
