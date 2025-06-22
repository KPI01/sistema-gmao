import { PropsWithChildren, ReactNode } from "react";
import { router } from "@inertiajs/react";
import { Method } from "@/types";

interface RedirectButtonProps extends PropsWithChildren {
    url: string;
    className?: string;
    method?: Method;
}

function RedirectButton({
    children,
    url,
    className,
    method = "get",
}: RedirectButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.visit(url, { method, preserveScroll: true });
    };
    return (
        <button
            type="button"
            onClick={handleClick}
            className={`btn ${className}`}
        >
            {children}
        </button>
    );
}

export default RedirectButton;
