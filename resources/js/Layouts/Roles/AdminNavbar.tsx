import { router, usePage } from "@inertiajs/react";

const LINKS: Array<{ label: string; href: string }> = [
    {
        label: "Incidencias",
        href: route("incidence.index"),
    },
    {
        label: "Maquinas",
        href: "#",
    },
];

export function AdminNavigation({}) {
    const { auth } = usePage().props;

    const handleRedirect = (url: string) => {
        console.debug(`Redirigiendo a ${url}...`);
        router.get(url, { preserveScroll: true });
    };

    return (
        <nav className="flex flex-col items-center justify-between min-h-screen bg-slate-800 text-slate-50 border-r-4 border-r-slate-600">
            <h1 className="mt-4 font-bold text-4xl">GMAO</h1>

            <ul className="menu bg-transparent text-left text-xl gap-y-4">
                {LINKS.map((link, index) => (
                    <li
                        key={index}
                        className="hover:shadow-sm hover:shadow-white/10 rounded"
                    >
                        <a
                            className="hover:font-semibold"
                            onClick={() => handleRedirect(link.href)}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="dropdown dropdown-top">
                <div tabIndex={0} role="button" className="btn btn-wide m-1 mb-2">
                    {auth.user.name}{" "}
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content text-slate-800 menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
                >
                    <li>
                        <a>Cerrar sesión</a>
                    </li>
                    <li>
                        <a>Perfil</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
