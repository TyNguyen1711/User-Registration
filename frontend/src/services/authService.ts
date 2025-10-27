export interface AuthData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    createdAt: string;
  };
}
// Register API
const SERVER_URL =
  (import.meta.env as any).SERVER_URL ?? "http://localhost:3000";

export const registerUser = async (data: AuthData): Promise<AuthResponse> => {
  const response = await fetch(`${SERVER_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Đăng ký thất bại");
  }

  return response.json();
};

// Login API (nếu có backend endpoint)
export const loginUser = async (data: AuthData): Promise<AuthResponse> => {
  const response = await fetch(`${SERVER_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Đăng nhập thất bại");
  }

  return response.json();
};
