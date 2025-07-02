import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface RootProps extends ComponentPropsWithoutRef<"input"> {}

interface CheckboxWithLabelProps extends ComponentPropsWithoutRef<"label"> {
    label: string;
}

function Root({ className = "", ...props }: RootProps) {
    return (
        <input type="checkbox" className={`checkbox ${className}`} {...props} />
    );
}

function CheckboxWithLabel({
    className = "",
    label,
    children,
    ...props
}: CheckboxWithLabelProps & PropsWithChildren) {
    return (
        <label className={`label cursor-pointer ${className}`} {...props}>
            {children}
            <span className="label-text">{label}</span>
        </label>
    );
}

export { Root as Checkbox, CheckboxWithLabel };
