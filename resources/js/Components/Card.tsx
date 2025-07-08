import { PropsWithChildren } from "react";

interface RootProps extends PropsWithChildren {
    className?: string;
    rootClassName?: string;
}

interface TitleProps extends PropsWithChildren {
    className?: string;
}

function Root({ children, className = "", rootClassName = "" }: RootProps) {
    return (
        <div
            className={`card card-bordered border-2 border-slate-200 max-w-[70%] shadow-lg mx-auto ${rootClassName}`}
        >
            <div className={`card-body ${className}`}>{children}</div>
        </div>
    );
}

function Title({ children, className = "" }: TitleProps) {
    return (
        <div className={`card-title flex-wrap ${className}`}>{children}</div>
    );
}

export { Root as Card, Title as CardTitle };
