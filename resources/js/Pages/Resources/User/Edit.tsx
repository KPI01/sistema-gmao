import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/AlertDialog";
import { Card, CardTitle } from "@/Components/Card";
import { Input, InputWithLabel } from "@/Components/Forms/Input";
import Layout from "@/Layouts/Layout";
import { User } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { Eye, EyeClosed, Key, Trash } from "lucide-react";
import { useState } from "react";

interface Props {
    user: User;
}

function Edit({ user }: Props) {
    const { auth } = usePage().props;
    const { can } = auth;

    const userForm = useForm({
        name: user.name,
        email: user.email,
        username: user.username,
    } satisfies Partial<User>);
    const handleUserUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        console.debug("actualizando usuario con:", userForm.data);

        userForm.transform((data) => {
            let copy = data;

            Object.keys(copy).forEach((key) => {
                // @ts-ignore
                if (
                    // @ts-ignore
                    copy[key] === "" ||
                    // @ts-ignore
                    copy[key] === null ||
                    // @ts-ignore
                    copy[key] === undefined ||
                    // @ts-ignore
                    copy[key] === user[key]
                ) {
                    // @ts-ignore
                    delete data[key];
                }
            });

            return copy;
        });

        console.debug("actualizando usuario con:", userForm.data);

        userForm.put(route("user.update", user.id), {
            onSuccess: () => {
                userForm.reset();
            },
        });
    };

    const [resetPasswordFormOpen, setResetPasswordFormOpen] = useState(false);
    const resetPasswordForm = useForm({
        new_password: "",
        new_password_confirmation: "",
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handlePasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        console.debug("restablecer contraseña con:", resetPasswordForm.data);

        resetPasswordForm.post(route("user.reset-password", user.id));

        resetPasswordForm.reset();
    };

    const handleDelete = () => {
        console.debug("eliminando recurso...");
        router.delete(route("user.destroy", user.id), { preserveScroll: true });
    };

    return (
        <Layout>
            <Card>
                <CardTitle className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">
                        ID de Usuario: {user.id}
                    </h1>
                    <div className="flex items-center gap-x-4">
                        <AlertDialog
                            open={resetPasswordFormOpen}
                            onOpenChange={setResetPasswordFormOpen}
                        >
                            <AlertDialogTrigger
                                className={`btn-warning btn-sm ${
                                    can.update.user ? "inline-flex" : "hidden"
                                }`}
                            >
                                Restablecer clave <Key size={16} />
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-3/5">
                                <AlertDialogTitle>
                                    Restablecer Clave
                                </AlertDialogTitle>
                                <div className="divider"></div>
                                <form
                                    className="grid"
                                    onSubmit={handlePasswordReset}
                                >
                                    <InputWithLabel label="Nueva clave">
                                        <div className="flex gap-x-2">
                                            <Input
                                                tabIndex={1}
                                                name="new_password"
                                                type={
                                                    showNewPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="input-bordered basis-full"
                                                autoComplete="new-password"
                                                value={
                                                    resetPasswordForm.data
                                                        .new_password
                                                }
                                                onChange={(e) =>
                                                    resetPasswordForm.setData(
                                                        "new_password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                className={`btn ${
                                                    showNewPassword
                                                        ? "btn-outline"
                                                        : "btn-ghost"
                                                }`}
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                            >
                                                {showNewPassword ? (
                                                    <EyeClosed />
                                                ) : (
                                                    <Eye />
                                                )}
                                            </button>
                                        </div>
                                    </InputWithLabel>
                                    <InputWithLabel label="Confirmar clave">
                                        <div className="flex gap-x-2">
                                            <Input
                                                tabIndex={2}
                                                name="new_password_confirmation"
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="input-bordered basis-full"
                                                autoComplete="new-password"
                                                value={
                                                    resetPasswordForm.data
                                                        .new_password_confirmation
                                                }
                                                onChange={(e) =>
                                                    resetPasswordForm.setData(
                                                        "new_password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                className={`btn ${
                                                    showConfirmPassword
                                                        ? "btn-outline"
                                                        : "btn-ghost"
                                                }`}
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeClosed />
                                                ) : (
                                                    <Eye />
                                                )}
                                            </button>
                                        </div>
                                    </InputWithLabel>
                                    <div className="flex justify-end items-center gap-x-4 mt-4">
                                        <AlertDialogCancel>
                                            Cancelar
                                        </AlertDialogCancel>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                setTimeout(
                                                    () =>
                                                        setResetPasswordFormOpen(
                                                            false
                                                        ),
                                                    250
                                                )
                                            }
                                            disabled={
                                                !resetPasswordForm.isDirty
                                            }
                                        >
                                            Restablecer
                                        </button>
                                    </div>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                        {auth.user.id !== user.id && can.delete.user && (
                            <AlertDialog>
                                <AlertDialogTrigger className="btn btn-error btn-sm inline-flex">
                                    <Trash size={16} />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogTitle>
                                        ¿Estás seguro de que deseas eliminar
                                        este usuario?
                                    </AlertDialogTitle>
                                    <div className="divider"></div>
                                    <div className="mb-4">
                                        Esta acción no se puede deshacer. El
                                        usuario y todos sus datos asociados
                                        serán eliminados permanentemente.
                                    </div>
                                    <div className="flex justify-end items-center gap-x-4 mt-4">
                                        <AlertDialogCancel>
                                            Cancelar
                                        </AlertDialogCancel>
                                        <button
                                            className="btn btn-error"
                                            onClick={() => handleDelete()}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </CardTitle>
                <div className="divider"></div>
                <form
                    className="grid md:grid-cols-2 gap-4"
                    onSubmit={handleUserUpdate}
                >
                    <InputWithLabel label="Nombre" className="col-span-full">
                        <Input
                            name="name"
                            className="input-bordered"
                            value={userForm.data.name}
                            onChange={(e) =>
                                userForm.setData("name", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Nombre de usuario">
                        <Input
                            name="username"
                            className="input-bordered"
                            value={userForm.data.username}
                            onChange={(e) =>
                                userForm.setData("username", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Correo">
                        <Input
                            name="email"
                            type="email"
                            className="input-bordered"
                            value={userForm.data.email}
                            onChange={(e) =>
                                userForm.setData("email", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <div className="col-span-full flex justify-end items-center gap-x-8">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => router.get(route("user.index"))}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`transition btn btn-primary ${
                                userForm.isDirty ? "inline-flex" : "hidden"
                            }`}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}

export default Edit;
