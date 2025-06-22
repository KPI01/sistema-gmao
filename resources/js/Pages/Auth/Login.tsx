import GuestLayout from "@/Layouts/GuestLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginData {
    username: string;
    password: string;
    remember: boolean;
}

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { data, setData, post, errors } = useForm({
        username: "",
        password: "",
        remember: false,
    } satisfies LoginData);

    errors ?? console.error(errors);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () =>
                setData({
                    username: "",
                    password: "",
                    remember: false,
                }),
        });
    };

    return (
        <GuestLayout>
            <div className="card card-normal shadow-lg card-bordered border-slate-300 bg-slate-100">
                <div className="card-body">
                    <div className="card-title flex flex-col">
                        <h1 className="text-3xl font-bold">GMAO</h1>
                        <span className="font-thin text-md">
                            Gestión de Mantenimiento Asistido por Ordenador
                        </span>
                    </div>
                    <div className="divider"></div>
                    <form className="grid gap-y-4" onSubmit={submit}>
                        <label className="form-control w-full">
                            <div className="label text-slate-900">
                                <span className="label-text mb-1 font-semibold">
                                    Nombre de usuario
                                </span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Usuario..."
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label text-slate-900">
                                <span className="label-text mb-1 font-semibold">Clave</span>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full"
                                    placeholder="********"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className={"btn ms-auto " +( showPassword ? "btn-active btn-ghost shadow-gray-500 shadow-inner" : "btn-ghost") }
                                    onClick={() => handlePasswordVisibility()}
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </label>

                        <span className="text-xs text-slate-600">
                            ¿Has olvidado tu clave?{" "}
                            <a href="#" className="text-blue-600">
                                Pincha aquí
                            </a>
                        </span>
                        <div className="form-control items-start">
                            <label className="label cursor-pointer text-slate-900 gap-x-2">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="checkbox checkbox-primary"
                                />
                                <span className="label-text">Recordarme</span>
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Login;
