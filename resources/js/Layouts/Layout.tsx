import { PropsWithChildren, useEffect } from "react";
import { Navigation } from "./Navbar";
import { usePage } from "@inertiajs/react";

interface Props extends PropsWithChildren {
    containerClass?: string;
}

function Layout({ children, containerClass }: Props) {
    const { errors } = usePage().props;
    console.error(errors);

    useEffect(() => {
        if (errors && errors.access) {
            alert(errors.access);
        }
    }, []);

    return (
        <div className="flex min-h-screen">
            <Navigation />
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

export default Layout;
