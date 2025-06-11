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
            className={`px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
                className || ""
            }`}
        >
            {label}
        </button>
    );
};

export default GoToBtn;
