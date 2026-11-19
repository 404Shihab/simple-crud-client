"use client";

import { useActionState } from "react";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { login } from "@/app/lib/auth-actions";

const LoginForm = () => {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Welcome back</h2>
                <p className="text-sm text-muted">
                    Sign in to manage your users
                </p>
            </div>

            <Form action={formAction} className="flex flex-col gap-4">
                <TextField isRequired name="username">
                    <Label>Username</Label>
                    <Input placeholder="Enter username" />
                    <FieldError />
                </TextField>

                <TextField isRequired name="password" type="password">
                    <Label>Password</Label>
                    <Input placeholder="Enter password" />
                    <FieldError />
                </TextField>

                {state?.error && (
                    <p className="text-sm text-danger">{state.error}</p>
                )}

                <Button type="submit" className="w-full" isDisabled={isPending}>
                    {isPending ? "Signing in..." : "Sign in"}
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;