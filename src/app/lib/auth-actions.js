"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456";

export const login = async (prevState, formData) => {
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return { error: "Invalid username or password" };
    }

    const cookieStore = await cookies();
    cookieStore.set("auth", "true", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    redirect("/users");
};

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("auth");
    redirect("/");
};