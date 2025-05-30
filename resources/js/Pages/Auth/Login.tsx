import GuestLayout from "@/Layouts/GuestLayout"
import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";

interface LoginData {
    username: string;
    password: string;
    remember: boolean;
}

function Login() {
    const { data, setData, post } = useForm({
            username: '',
            password: '',
            remember: false
        } satisfies LoginData
    )

    const submit = (e: FormEvent) => {
        e.preventDefault()

        post(route('login'), {
            onFinish: () => setData({
                username: '',
                password: '',
                remember: false
            })
        })
    }

    return (
        <GuestLayout>
            <div className="card max-w-lg bg-slate-50">
                <div className="card-header text-center">
                    <h1 className="text-3xl font-bold">GMAO</h1>
                    <span className="font-thin text-sm">Gestión de Mantenimiento Asistido por Ordenador</span>
                </div>
                <div className="card-body grid">
                    <form onSubmit={submit}>
                        <div className="input-group w-full">
                            <label htmlFor="username">Nombre de usuario</label>
                            <input className="w-72" type="text" autoComplete="username" value={data.username} onChange={e => setData('username', e.target.value)} />
                        </div>
                        <div className="input-group w-full">
                            <label htmlFor="password">Clave</label>
                            <input className="w-72 mb-1" type="text" autoComplete="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                            <span className="text-xs text-slate-600">
                                ¿Has olvidado tu clave? <a href="#" className="text-blue-600">Pincha aquí</a>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className="select-none">Recordarme</label>
                        </div>
                        <div className="flex justify-end">
                        <button type="submit" className="bg-slate-700 text-white font-semibold">Iniciar sesión</button>
                        </div>
                    </form> 
                </div>
            </div>
        </GuestLayout>
    )
}

export default Login