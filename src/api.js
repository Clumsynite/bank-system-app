const URL = "https://bank-service-api.herokuapp.com";

export const signup = async (user) => {
  try {
    const response = await fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${URL}/logout`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const userTransactions = async (username, token) => {
  try {
    const response = await fetch(`${URL}/user/${username}/transactions`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
