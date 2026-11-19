import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { Users, ShieldCheck, Database } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Manage users",
        text: "View, edit and delete team members from one clean table.",
    },
    {
        icon: ShieldCheck,
        title: "Protected access",
        text: "Only signed-in admins can open the user management area.",
    },
    {
        icon: Database,
        title: "Connected backend",
        text: "Built with Next.js, Express and MongoDB.",
    },
];

const linkClass =
    "rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground";

// Only this small part reads cookies, so only this part is streamed
const AuthButton = async () => {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get("auth")?.value === "true";

    return isLoggedIn ? (
        <Link href="/users" className={linkClass}>
            Manage users
        </Link>
    ) : (
        <Link href="/login" className={linkClass}>
            Login
        </Link>
    );
};

const HomePage = () => {
    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-16">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Simple CRUD App
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted">
                    A small full-stack project to create, read, update and delete
                    users. Sign in to get started.
                </p>

                <div className="mt-8 flex min-h-[42px] items-center justify-center gap-3">
                    <Suspense
                        fallback={
                            <div className="h-[42px] w-32 animate-pulse rounded-lg bg-default" />
                        }
                    >
                        <AuthButton />
                    </Suspense>
                </div>
            </section>

            <section className="mt-16 grid gap-4 sm:grid-cols-3">
                {features.map(({ icon: Icon, title, text }) => (
                    <div
                        key={title}
                        className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                    >
                        <Icon className="mb-3 h-6 w-6" />
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mt-1 text-sm text-muted">{text}</p>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default HomePage;