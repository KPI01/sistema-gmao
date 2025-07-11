import { Method, PageProps } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { ChevronUp, LogOut, User } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { useState } from "react";

type NavItemProps = {
    label: string;
    onClick: () => void;
    submenu?: Omit<NavItemProps, "submenu">[];
};

function NavItem({ label, onClick, submenu }: NavItemProps) {
    if (submenu && submenu.length > 0) {
        return (
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className="hover:font-semibold">
                    {label}
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        side="right"
                        sideOffset={5}
                        tabIndex={0}
                        asChild
                    >
                        <ul className="menu dropdown-content text-slate-800 bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                            {submenu.map((item, index) => (
                                <NavItem
                                    key={index}
                                    label={item.label}
                                    onClick={item.onClick}
                                />
                            ))}
                        </ul>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );
    }

    return (
        <li className="hover:shadow-sm hover:shadow-white/10 rounded">
            <a className="hover:font-semibold" onClick={onClick}>
                {label}
            </a>
        </li>
    );
}

export function Navigation() {
    const { auth } = usePage<PageProps>().props;
    const { user, can } = auth;
    console.debug("auth:", auth);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleRedirect = (url: string, method: Method = "get") => {
        console.debug(`Redirigiendo a ${url}...`);
        router.visit(url, { method, preserveScroll: true });
    };

    return (
        <nav className="basis-1/6 w-full flex flex-col items-center justify-between bg-slate-800 text-slate-50 border-r-4 border-r-slate-600">
            <h1 className="mt-4 font-bold text-4xl">GMAO</h1>

            <ul className="menu bg-transparent text-left text-xl gap-y-4">
                {can.see.incidence && (
                    <NavItem
                        label="Incidencias"
                        onClick={() => handleRedirect(route("incidence.index"))}
                    />
                )}
                {can.see.asset && (
                    <NavItem
                        label="Activos"
                        onClick={() => handleRedirect(route("asset.index"))}
                    />
                )}
                {can.see.user && (
                    <NavItem
                        label="Usuarios"
                        onClick={() => handleRedirect(route("user.index"))}
                    />
                )}
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
                    {user.name}{" "}
                    <ChevronUp
                        size={14}
                        className={`transition-transform ${
                            dropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content sideOffset={5} tabIndex={0}>
                    <ul className="dropdown-content text-slate-800 menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                        <li>
                            <Link href={route("logout")} method="post">
                                <LogOut size={14} />
                                Cerrar sesión
                            </Link>
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
