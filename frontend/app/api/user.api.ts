export const BACKEND_URL = "https://amazon-store.onrender.com";

export const signup = async (
  fullname: string,
  email: string,
  password: string
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const me = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const updateProfile = async (token:string , avatar:File | null) => {
  const formData = new FormData();
  if(avatar) formData.append("avatar", avatar);
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const getAllUsers = async (token:string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error
  }
}

export const getUserById = async (id:string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/user/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const deleteUser = async (token:string , id:string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization : `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}