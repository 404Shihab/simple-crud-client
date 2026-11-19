'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createUser = async (newUser) => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    if (!res.ok) {
        throw new Error(`Failed to create user: ${res.status}`);
    }

    const data = await res.json();

    revalidatePath('/users');

    return data;
};

export const updateUser = async (userId, formData) => {
    const updatedUser = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
        throw new Error(`Failed to update user: ${res.status}`);
    }

    const data = await res.json();

    if (data.matchedCount > 0) {
        revalidatePath("/users");
        redirect("/users");
    }
};

export const deleteUser = async (userId) => {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Failed to delete user: ${res.status}`);
    }

    const data = await res.json();

    if (data.deletedCount > 0) {
        revalidatePath('/users');
    }

    return data;
};