import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

function Root({ className = "", ...props }: ComponentPropsWithoutRef<"input">) {
    return <input {...props} className={`input ${className}`} />;
}

function InputWithLabel({
    label,
    children,
    className = "",
    ...props
}: {
    label: string;
} & ComponentPropsWithoutRef<"label"> &
    PropsWithChildren) {
    return (
        <label className={`form-control ${className}`} {...props}>
            <span className="label font-bold">{label}</span>
            {children}
        </label>
    );
}

function InputWithInternalLabel({
    label,
    className,
    children,
    ...props
}: {
    label: string;
} & ComponentPropsWithoutRef<"label"> &
    PropsWithChildren) {
    return (
        <label
            className={`input input-bordered flex items-center gap-2 ${className}`}
            {...props}
        >
            <span className="label font-bold">{label}</span>
            {children}
        </label>
    );
}

export { Root as Input, InputWithLabel, InputWithInternalLabel };
