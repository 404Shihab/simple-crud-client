"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Chip, Button, Tooltip, Avatar, AlertDialog } from "@heroui/react";
import { Pencil, TrashBin, Eye } from "@gravity-ui/icons";

const getInitials = (name = "") =>
    name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const RoleChip = ({ role }) => (
    <Chip
        size="sm"
        variant="soft"
        color={role === "admin" ? "accent" : "default"}
        className="capitalize"
    >
        {role}
    </Chip>
);

const UsersTable = ({ users = [], deleteUserAction }) => {
    const router = useRouter();
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        try {
            setIsDeleting(true);
            const result = await deleteUserAction?.(userToDelete._id);
            if (result?.deletedCount > 0) {
                setUserToDelete(null);
                router.refresh();
            }
        } catch (err) {
            console.error("Failed to delete user:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
                <div className="min-w-0">
                    <h2 className="text-lg font-semibold">Users</h2>
                    <p className="text-sm text-muted">
                        Manage your team members and their roles
                    </p>
                </div>
                <Chip size="sm" variant="soft" className="shrink-0">
                    {users.length} total
                </Chip>
            </div>

            <div className="md:hidden">
                {users.length === 0 ? (
                    <div className="py-10 text-center text-muted">
                        No users found
                    </div>
                ) : (
                    <ul className="divide-y divide-border">
                        {users.map((user) => (
                            <li key={user._id} className="flex flex-col gap-3 p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm">
                                        <Avatar.Fallback>
                                            {getInitials(user.name)}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-medium">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-sm text-muted">
                                            {user.email}
                                        </p>
                                    </div>
                                    <RoleChip role={user.role} />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="flex-1"
                                        onPress={() =>
                                            router.push(`/users/${user._id}`)
                                        }
                                    >
                                        <Eye width={16} height={16} />
                                        Details
                                    </Button>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        aria-label="Edit user"
                                        onPress={() =>
                                            router.push(`/users/${user._id}/edit`)
                                        }
                                    >
                                        <Pencil width={16} height={16} />
                                    </Button>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        className="text-danger"
                                        aria-label="Delete user"
                                        onPress={() => setUserToDelete(user)}
                                    >
                                        <TrashBin width={16} height={16} />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="hidden md:block">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Users table">
                            <Table.Header>
                                <Table.Column isRowHeader>NAME</Table.Column>
                                <Table.Column>EMAIL</Table.Column>
                                <Table.Column>ROLE</Table.Column>
                                <Table.Column className="text-end">
                                    ACTIONS
                                </Table.Column>
                            </Table.Header>

                            <Table.Body
                                renderEmptyState={() => (
                                    <div className="py-10 text-center text-muted">
                                        No users found
                                    </div>
                                )}
                            >
                                {users.map((user) => (
                                    <Table.Row key={user._id} id={user._id}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="sm">
                                                    <Avatar.Fallback>
                                                        {getInitials(user.name)}
                                                    </Avatar.Fallback>
                                                </Avatar>
                                                <span className="font-medium">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="text-muted">
                                                {user.email}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <RoleChip role={user.role} />
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onPress={() =>
                                                        router.push(
                                                            `/users/${user._id}`
                                                        )
                                                    }
                                                >
                                                    <Eye width={16} height={16} />
                                                    Details
                                                </Button>

                                                <Tooltip delay={0}>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="ghost"
                                                        aria-label="Edit user"
                                                        onPress={() =>
                                                            router.push(
                                                                `/users/${user._id}/edit`
                                                            )
                                                        }
                                                    >
                                                        <Pencil
                                                            width={16}
                                                            height={16}
                                                        />
                                                    </Button>
                                                    <Tooltip.Content>
                                                        <p>Edit user</p>
                                                    </Tooltip.Content>
                                                </Tooltip>

                                                <Tooltip delay={0}>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-danger"
                                                        aria-label="Delete user"
                                                        onPress={() =>
                                                            setUserToDelete(user)
                                                        }
                                                    >
                                                        <TrashBin
                                                            width={16}
                                                            height={16}
                                                        />
                                                    </Button>
                                                    <Tooltip.Content>
                                                        <p>Delete user</p>
                                                    </Tooltip.Content>
                                                </Tooltip>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            <AlertDialog.Backdrop
                isOpen={!!userToDelete}
                onOpenChange={(open) => {
                    if (!open && !isDeleting) setUserToDelete(null);
                }}
            >
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[420px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete this user?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                You are about to delete{" "}
                                <span className="font-semibold">
                                    {userToDelete?.name}
                                </span>{" "}
                                ({userToDelete?.email}). This action cannot be
                                undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button
                                slot="close"
                                variant="tertiary"
                                isDisabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onPress={handleConfirmDelete}
                                isDisabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </div>
    );
};

export default UsersTable;