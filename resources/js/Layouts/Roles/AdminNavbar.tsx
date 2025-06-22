import { Method, PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { ChevronUp, LogOut, User } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { useState } from "react";

const LINKS: Array<{ label: string; href: string }> = [
    {
        label: "Incidencias",
        href: route("incidence.index"),
    },
    {
        label: "Usuarios",
        href: "#",
    },
];

export function AdminNavigation({}) {
    const { auth } = usePage<PageProps>().props;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleRedirect = (url: string, method: Method = "get") => {
        console.debug(`Redirigiendo a ${url}...`);
        router.visit(url, { method, preserveScroll: true });
    };

    return (
        <nav className="basis-1/6 w-full flex flex-col items-center justify-between bg-slate-800 text-slate-50 border-r-4 border-r-slate-600">
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
            <DropdownMenu.Root
                open={dropdownOpen}
                onOpenChange={setDropdownOpen}
            >
                <DropdownMenu.Trigger
                    tabIndex={0}
                    role="button"
                    className="btn m-1 mb-2"
                >
                    {auth.user.name}{" "}
                    <ChevronUp
                        size={14}
                        className={`transition-transform ${
                            dropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content sideOffset={5} tabIndex={0}>
                    <ul className="dropdown-content text-slate-800 menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                        <li
                            onClick={() =>
                                handleRedirect(route("logout"), "post")
                            }
                        >
                            <LogOut size={14} />
                            Cerrar sesión
                        </li>
                        <li>
                            <a href="#">
                                <User size={14} /> Perfil
                            </a>
                        </li>
                    </ul>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </nav>
    );
}
