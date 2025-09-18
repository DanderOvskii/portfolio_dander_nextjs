import { clearUser, setUser } from "@/utils/sessionStorage";
import { FormData, ProjectFormData } from "@/utils/types";
import { Project } from "@prisma/client";
import { extractFilename } from "./helpers";
import { promises } from "dns";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    const { redirectUrl, user } = data;

    // Store the user data in session storage
    setUser(user);

    // Redirect to the specified URL
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function signUpUser(formData: FormData) {
  try {
    const response = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign-up failed");
    }

    const data = await response.json();
    const { redirectUrl, user } = data;

    // Store the user data in session storage
    setUser(user);

    // Redirect to the specified URL
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch("/api/v1/auth/logout", {
      method: "POST",
    });

    if (response.redirected) {
      clearUser();
      window.location.href = response.url;
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

export async function uploadImage(file: File) {
  const res = await fetch("/api/v1/uploads", {
    method: "POST",
    body: file,
    headers: {
      'Content-Type': file.type,
      'X-Filename': file.name,
      'Content-Length': file.size.toString(),
    }
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || "Upload failed");
  return res.json() as Promise<{ path: string }>;
}

export async function deleteImage(imagePath: string) {
  const filename = extractFilename(imagePath);
  const res = await fetch("/api/v1/uploads", {
    method: "DELETE",
    headers: { "X-Filename": filename }
  });
  if (!res.ok) {
    throw new Error((await res.json().catch(() => ({}))).message || "Delete failed");
  }
  return res.json() as Promise<{ deleted: boolean }>;
}

export async function addProject(project: ProjectFormData) {
  const response = await fetch("/api/v1/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add project");
  }

  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch("/api/v1/projects");
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || "Failed to get projects");
  return await response.json();
}

export async function getProject(id: string): Promise<Project> {
  const response = await fetch(`/api/v1/projects/${id}`);
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || "Failed to get project");
  return await response.json();
}

export async function editProject(project: ProjectFormData, id: string) {
  const response = await fetch(`/api/v1/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to edit project");
  }

  return response.json();
}
