import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import { logout } from "@/app/lib/auth-actions";

const AuthGate = async ({ children }) => {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get("auth")?.value === "true";

    if (!isLoggedIn) {
        redirect("/login");
    }

    return (
        <div className="mx-auto w-full max-w-5xl p-4">
            <div className="mb-4 flex items-center justify-between">
                <Link href="/" className="text-sm font-medium hover:underline">
                    Home
                </Link>
                <form action={logout}>
                    <Button type="submit" size="sm" variant="secondary">
                        Logout
                    </Button>
                </form>
            </div>
            {children}
        </div>
    );
};

const UsersLayout = ({ children }) => {
    return (
        <Suspense fallback={<div className="p-4 text-muted">Loading...</div>}>
            <AuthGate>{children}</AuthGate>
        </Suspense>
    );
};

export default UsersLayout;