import { PropsWithChildren } from "react";
import { AdminNavigation } from "./AdminNavbar";

interface Props extends PropsWithChildren {
    containerClass?: string;
}

function AdminLayout({ children, containerClass }: Props) {
    return (
        <div className="flex min-h-screen">
            <AdminNavigation />
            <main
                id="content"
                className={
                    "py-3 px-6 w-full" + (children ? " " + containerClass : "")
                }
            >
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;
