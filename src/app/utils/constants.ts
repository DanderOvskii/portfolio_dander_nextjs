import { FormData,ProjectFormData } from "@/utils/types";

export const concert = {
  bandName: "Imagine Dragons",
  date: "Dec 29, 2024",
  location: "Madison Square Garden, New York, NY",
  description:
    "Join us for an unforgettable night with Imagine Dragons. Experience their greatest hits live!",
};

export const invalidEmail = "Invalid email format";
export const invalidPassword =
  "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
export const invalidCredentials = "Invalid credentials";
export const unauthorized = "Unauthorized";
export const tokenExpiry = "1h";
export const tokenAlgorithm = "HS256";
export const sessionNotFound = "Session not found";
export const feedNotFound = "Feed not found";
export const emailIsTaken = "Email is already taken";
export const genericErrors = {
  loginFailed: "Login failed. Please check your credentials and try again.",
  signupFailed: "Sign-up failed. Please try again.",
  logoutFailed: "Logout failed. Please try again.",
};
export const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  profileImage: "",
  email: "",
  password: "",
  role: "USER",
  dateOfBirth: "",
};
export const initialProjectData: ProjectFormData = {
  name: "",
  description: "",
  projectDate: "",
  languages: "",
  image: "",
  website: "",
};
