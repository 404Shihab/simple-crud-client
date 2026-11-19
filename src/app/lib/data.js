const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    return data;
};

export const getUserById = async (userId) => {
    const res = await fetch(`${API_URL}/users/${userId}`);
    const data = await res.json();
    return data;
};