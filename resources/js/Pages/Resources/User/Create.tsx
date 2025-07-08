import { Card, CardTitle } from "@/Components/Card";
import {
    Input,
    InputWithInternalLabel,
    InputWithLabel,
} from "@/Components/Forms/Input";
import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";
import { Eye, EyeClosed } from "lucide-react";
import { FormEvent, useState } from "react";

type CreateUserData = {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface Props {
    users_count: number;
}

function Create({ users_count }: Props) {
    const [showField, setShowField] = useState({
        password: false,
        password_confirmation: false,
    });

    const { data, setData, errors, post, reset } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    } satisfies CreateUserData);
    errors && console.error(errors);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.debug("creando usuario...", data);

        post(route("user.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout>
            <Card>
                <CardTitle className="text-4xl font-bold">
                    Registro de Nuevo Usuario
                </CardTitle>
                <div className="divider"></div>
                <form
                    className="grid md:grid-cols-2 gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="col-span-full flex gap-x-4">
                        <InputWithInternalLabel label="ID" className="input-sm w-fit">
                            <Input className="input-sm max-w-[14ch]" value={users_count} disabled />
                        </InputWithInternalLabel>
                    </div>
                    <InputWithLabel label="Nombre *" className="col-span-full">
                        <Input
                            className="input-bordered"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Correo *">
                        <Input
                            className="input-bordered"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Nombre de usuario *">
                        <Input
                            className="input-bordered"
                            name="username"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Contraseña *">
                        <div className="flex items-center gap-x-2">
                            <Input
                                className="input-bordered basis-full"
                                name="password"
                                type={showField.password ? "text" : "password"}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <button
                            tabIndex={-1}
                                type="button"
                                className="btn btn-sm"
                                onClick={() =>
                                    setShowField({
                                        ...showField,
                                        password: !showField.password,
                                    })
                                }
                            >
                                {showField.password ? (
                                    <Eye size={16} />
                                ) : (
                                    <EyeClosed size={16} />
                                )}
                            </button>
                        </div>
                    </InputWithLabel>
                    <InputWithLabel label="Confirma la contraseña *">
                        <div className="flex items-center gap-x-2">
                            <Input
                                className="input-bordered basis-full"
                                name="password_confirmation"
                                type={
                                    showField.password_confirmation
                                        ? "text"
                                        : "password"
                                }
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            <button
                            tabIndex={-2}
                                type="button"
                                className="btn btn-sm"
                                onClick={() =>
                                    setShowField({
                                        ...showField,
                                        password_confirmation:
                                            !showField.password_confirmation,
                                    })
                                }
                            >
                                {showField.password_confirmation ? (
                                    <Eye size={16} />
                                ) : (
                                    <EyeClosed size={16} />
                                )}
                            </button>
                        </div>
                    </InputWithLabel>
                    <div className="col-span-full flex justify-end gap-x-8 mt-8">
                        <button type="button" className="btn btn-neutral">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}

export default Create;
