import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Button,
} from "@heroui/react";
import { getUserById } from "@/app/lib/data";
import { updateUser } from "@/app/lib/actions";

const ROLES = [
    { id: "admin", label: "Admin" },
    { id: "user", label: "User" },
];

const UserEditPage = async ({ params }) => {
    const { userId } = await params;
    const user = await getUserById(userId);

    if (!user) notFound();

    // Pre-fills the first argument (userId); the form passes FormData as the second
    const updateUserWithId = updateUser.bind(null, userId);

    return (
        <div className="mx-auto w-full max-w-xl p-4">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">Edit user</h2>
                    <p className="text-sm text-muted">
                        Update the information for {user.name}
                    </p>
                </div>

                <Form action={updateUserWithId} className="flex flex-col gap-4">
                    <TextField
                        isRequired
                        name="name"
                        minLength={2}
                        defaultValue={user.name}
                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter full name" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        defaultValue={user.email}
                    >
                        <Label>Email</Label>
                        <Input placeholder="Enter email address" />
                        <FieldError />
                    </TextField>

                    <Select
                        className="w-full"
                        name="role"
                        placeholder="Select a role"
                        defaultSelectedKey={user.role}
                    >
                        <Label>Role</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {ROLES.map((role) => (
                                    <ListBox.Item
                                        key={role.id}
                                        id={role.id}
                                        textValue={role.label}
                                    >
                                        {role.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <div className="mt-2 flex items-center justify-end gap-2">
                        <Link
                            href="/users"
                            className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-default"
                        >
                            Cancel
                        </Link>
                        <Button type="submit">Save changes</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserEditPage;