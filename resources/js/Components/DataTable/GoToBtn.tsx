import React, { ReactNode } from "react";
import { router } from "@inertiajs/react";

type GoToBtnProps = {
    to: string;
    label?: ReactNode;
    className?: string;
};

const GoToBtn: React.FC<GoToBtnProps> = ({
    to,
    label = "Detalles",
    className,
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.visit(to);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="btn btn-secondary btn-xs"
        >
            {label}
        </button>
    );
};

export default GoToBtn;
