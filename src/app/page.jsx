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

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#tech-stack", label: "Tech stack" },
];

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
        text: "A REST API built with Node.js and Express, backed by MongoDB.",
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

const techStack = [
    { name: "React", role: "UI library" },
    { name: "Next.js", role: "App Router framework" },
    { name: "Tailwind CSS", role: "Styling" },
    { name: "Node.js", role: "Server runtime" },
    { name: "Express.js", role: "REST API" },
    { name: "MongoDB", role: "Database" },
];

const stats = [
    { value: "4", label: "CRUD actions" },
    { value: "6", label: "Core technologies" },
    { value: "100%", label: "Protected routes" },
];

const linkClass =
    "inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--brand-dark)]";

const smallLinkClass =
    "inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--brand-dark)]";

// Only this small part reads cookies, so only this part is streamed
const AuthButton = async ({ small = false }) => {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get("auth")?.value === "true";
    const className = small ? smallLinkClass : linkClass;

    return isLoggedIn ? (
        <Link href="/users" className={className}>
            Manage users
        </Link>
    ) : (
        <Link href="/login" className={className}>
            Login
        </Link>
    );
};

const AuthButtonFallback = ({ small = false }) => (
    <div
        className={`animate-pulse rounded-lg bg-[var(--tint)] ${
            small ? "h-[38px] w-24" : "h-[46px] w-36"
        }`}
    />
);

const Navbar = () => (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/80 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                <span className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--brand-dark)]">CRUD App</span>
            </Link>

            <ul className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] md:flex">
                {navLinks.map(({ href, label }) => (
                    <li key={href}>
                        <a
                            href={href}
                            className="transition hover:text-[var(--brand-dark)]"
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>

            <Suspense fallback={<AuthButtonFallback small />}>
                <AuthButton small />
            </Suspense>
        </nav>
    </header>
);

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
                {/* Hero */}
                <section className="text-center">
                    <h1 className="text-5xl font-bold tracking-tight text-[var(--brand-dark)] sm:text-6xl">
                        Simple{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">CRUD</span>
                            <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded bg-[var(--accent)]/40" />
                        </span>{" "}
                        App
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)]">
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
                <section className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--tint)]">
                    {stats.map(({ value, label }) => (
                        <div key={label} className="px-4 py-6 text-center">
                            <p className="text-3xl font-bold text-[var(--brand-dark)]">
                                {value}
                            </p>
                            <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
                                {label}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Features */}
                <section id="features" className="mt-24 scroll-mt-24">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--brand-dark)]">
                        Everything you need
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-center text-[var(--muted)]">
                        Simple tools to keep your team data organized and secure.
                    </p>

                    <div className="mt-10 grid gap-6 sm:grid-cols-3">
                        {features.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-[var(--border)] bg-white p-7 transition hover:border-[var(--accent)] hover:shadow-md"
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--tint)]">
                                    <Icon className="h-5 w-5 text-[var(--accent)]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--brand-dark)]">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section id="how-it-works" className="mt-24 scroll-mt-24">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--brand-dark)]">
                        How it works
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-center text-[var(--muted)]">
                        Four simple actions cover everything you do with users.
                    </p>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map(({ icon: Icon, title, text }, index) => (
                            <div
                                key={title}
                                className="relative rounded-2xl border border-[var(--border)] bg-white p-7 transition hover:border-[var(--accent)] hover:shadow-md"
                            >
                                <span className="absolute right-5 top-4 text-4xl font-bold text-[var(--border)]">
                                    {index + 1}
                                </span>
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--tint)]">
                                    <Icon className="h-5 w-5 text-[var(--accent)]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--brand-dark)]">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech stack */}
                <section id="tech-stack" className="mt-24 scroll-mt-24">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--brand-dark)]">
                        Built with
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-center text-[var(--muted)]">
                        A modern MERN-style stack with a Next.js front end.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {techStack.map(({ name, role }) => (
                            <div
                                key={name}
                                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-5 py-4 transition hover:border-[var(--accent)]"
                            >
                                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                                <div>
                                    <p className="font-semibold text-[var(--brand-dark)]">
                                        {name}
                                    </p>
                                    <p className="text-xs text-[var(--muted)]">{role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to action */}
                <section className="mt-24 rounded-3xl border border-[var(--border)] bg-[var(--tint)] px-6 py-14 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-dark)]">
                        Ready to get started?
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
                        Sign in and start managing your users right away.
                    </p>
                    <div className="mt-8 flex min-h-[46px] items-center justify-center">
                        <Suspense fallback={<AuthButtonFallback />}>
                            <AuthButton />
                        </Suspense>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted)]">
                    Developed by{" "}
                    <a
                        href="https://github.com/404Shihab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 font-medium text-[var(--brand-dark)] hover:underline"
                    >
                        404Shihab
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </footer>
            </main>
        </div>
    );
};

export default HomePage;