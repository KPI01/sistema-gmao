import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

function Root({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
    return <textarea {...props} className={`textarea ${className}`} />;
}

export { Root as Textarea };
