import { router, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { DropdownMenu } from "radix-ui";

interface Props extends PropsWithChildren {}

function AdminLayout({ children }: Props) {
    const user = usePage().props.auth.user;

    const handleLogout = () => {
        console.debug("Cerrando sesión...");

        router.post(route("logout"), {}, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen grid grid-cols-[15vw_auto]">
            <nav className="min-h-full flex flex-col items-center justify-between gap-y-4 py-2 px-3 bg-gray-300 border-r-2 border-r-slate-400">
                <h2 className="font-bold text-4xl mt-4">GMAO</h2>
                <div className="text-right">
                    Aqui van los elementos del menu
                </div>
                <div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button type="button" className="bg-slate-100">
                                {user.name}
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="dropdown-content"
                                sideOffset={5}
                            >
                                <DropdownMenu.Item
                                    className="dropdown-item"
                                    asChild
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleLogout()}
                                    >
                                        Cerrar sesión
                                    </button>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            </nav>
            <div id="content" className="p-3">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
