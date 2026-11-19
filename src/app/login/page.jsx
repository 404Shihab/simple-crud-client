import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
    const cookieStore = await cookies();

    // Already logged in, go straight to the users page
    if (cookieStore.get("auth")?.value === "true") {
        redirect("/users");
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <LoginForm />
        </div>
    );
};

export default LoginPage;