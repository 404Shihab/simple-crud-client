import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

const AuthRedirect = async () => {
    const cookieStore = await cookies();

    // Already logged in, go straight to the users page
    if (cookieStore.get("auth")?.value === "true") {
        redirect("/users");
    }

    return null;
};

const LoginPage = () => {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <Suspense fallback={null}>
                <AuthRedirect />
            </Suspense>
            <LoginForm />
        </div>
    );
};

export default LoginPage;