const URL = "https://bank-service-api.herokuapp.com";
// const url = "http://localhost:5000";

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

export const userBalance = async (username, token) => {
  try {
    const response = await fetch(`${URL}/user/${username}/balance`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const withdraw = async (amount, token) => {
  try {
    const response = await fetch(`${URL}/account/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(amount),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const deposit = async (amount, token) => {
  try {
    const response = await fetch(`${URL}/account/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(amount),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const allCustomers = async (token) => {
  try {
    const response = await fetch(`${URL}/all/customers`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
