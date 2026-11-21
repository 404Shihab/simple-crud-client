import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import {
    Users,
    ShieldCheck,
    Database,
    UserPlus,
    Eye,
    Pencil,
    Trash2,
    ArrowUpRight,
} from "lucide-react";

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

const steps = [
    {
        icon: UserPlus,
        title: "Create",
        text: "Add a new user with a name, email and role. It is saved to MongoDB.",
    },
    {
        icon: Eye,
        title: "Read",
        text: "User data is fetched from the database and shown in a clean table.",
    },
    {
        icon: Pencil,
        title: "Update",
        text: "Edit any user's details and the changes are stored right away.",
    },
    {
        icon: Trash2,
        title: "Delete",
        text: "Remove users you no longer need with a single click.",
    },
];

const stats = [
    { value: "4", label: "CRUD actions" },
    { value: "3", label: "Core technologies" },
    { value: "100%", label: "Protected routes" },
];

const linkClass =
    "inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90";

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

const AuthButtonFallback = () => (
    <div className="h-[46px] w-36 animate-pulse rounded-lg bg-default" />
);

const HomePage = () => {
    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
            {/* Hero */}
            <section className="text-center">
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                    Simple <span className="text-accent">CRUD</span> App
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
                    A small full-stack project to create, read, update and delete
                    users. Sign in to get started.
                </p>

                <div className="mt-10 flex min-h-[46px] items-center justify-center gap-3">
                    <Suspense fallback={<AuthButtonFallback />}>
                        <AuthButton />
                    </Suspense>
                </div>
            </section>

            {/* Stats */}
            <section className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-surface shadow-sm">
                {stats.map(({ value, label }) => (
                    <div key={label} className="px-4 py-6 text-center">
                        <p className="text-3xl font-bold text-accent">{value}</p>
                        <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
                    </div>
                ))}
            </section>

            {/* Features */}
            <section className="mt-24">
                <h2 className="text-center text-3xl font-bold tracking-tight">
                    Everything you need
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-muted">
                    Simple tools to keep your team data organized and secure.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                    {features.map(({ icon: Icon, title, text }) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-border bg-surface p-7 shadow-sm transition hover:border-accent hover:shadow-md"
                        >
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-default">
                                <Icon className="h-5 w-5 text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="mt-24">
                <h2 className="text-center text-3xl font-bold tracking-tight">
                    How it works
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-muted">
                    Four simple actions cover everything you do with users.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map(({ icon: Icon, title, text }, index) => (
                        <div
                            key={title}
                            className="relative rounded-2xl border border-border bg-surface p-7 shadow-sm transition hover:border-accent hover:shadow-md"
                        >
                            <span className="absolute right-5 top-4 text-4xl font-bold text-border">
                                {index + 1}
                            </span>
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-default">
                                <Icon className="h-5 w-5 text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to action */}
            <section className="mt-24 rounded-3xl border border-border bg-surface px-6 py-14 text-center">
                <h2 className="text-3xl font-bold tracking-tight">
                    Ready to get started?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted">
                    Sign in and start managing your users right away.
                </p>
                <div className="mt-8 flex min-h-[46px] items-center justify-center">
                    <Suspense fallback={<AuthButtonFallback />}>
                        <AuthButton />
                    </Suspense>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 border-t border-border pt-8 text-center text-sm text-muted">
                Developed by{" "}
                <a
                    href="https://github.com/404Shihab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-medium text-accent hover:underline"
                >
                    404Shihab
                    <ArrowUpRight className="h-4 w-4" />
                </a>
            </footer>
        </main>
    );
};

export default HomePage;