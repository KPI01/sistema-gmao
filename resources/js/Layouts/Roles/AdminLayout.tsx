import { PropsWithChildren } from "react";
import { AdminNavigation } from "./AdminNavbar";

interface Props extends PropsWithChildren {
    containerClass?: string;
}

function AdminLayout({ children, containerClass }: Props) {
    return (
        <div className="min-h-screen grid grid-cols-[13vw_auto]">
            <AdminNavigation />
            <div
                id="content"
                className={
                    "py-3 px-6 min-w-full" + (children ? " " + containerClass : "")
                }
            >
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
