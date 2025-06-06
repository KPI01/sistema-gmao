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
            <div className="card max-w-lg bg-slate-50">
                <div className="card-header text-center">
                    <h1 className="text-3xl font-bold">GMAO</h1>
                    <span className="font-thin text-sm">
                        Gestión de Mantenimiento Asistido por Ordenador
                    </span>
                </div>
                <div className="card-body grid">
                    <form onSubmit={submit}>
                        <div className="input-group w-full">
                            <label htmlFor="username">Nombre de usuario</label>
                            <input
                                className="w-full"
                                type="text"
                                autoComplete="username"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                            />
                        </div>
                        <div className="input-group w-full">
                            <label htmlFor="password">Clave</label>
                            <div className="flex gap-x-5">
                                <input
                                    className="w-72 mb-1 basis-auto"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className="bg-slate-200 border border-slate-400 w-10 h-10 p-0 hover:bg-slate-300"
                                    onClick={() => handlePasswordVisibility()}
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={20}
                                            className="color-slate-950 m-auto hover:color-slate-800"
                                        />
                                    ) : (
                                        <Eye
                                            size={20}
                                            className="color-slate-950 m-auto hover:color-slate-800"
                                        />
                                    )}
                                </button>
                            </div>
                            <span className="text-xs text-slate-600">
                                ¿Has olvidado tu clave?{" "}
                                <a href="#" className="text-blue-600">
                                    Pincha aquí
                                </a>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                            />
                            <label htmlFor="remember" className="select-none">
                                Recordarme
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-slate-700 text-white font-semibold"
                            >
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
