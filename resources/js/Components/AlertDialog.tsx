import { AlertDialog as AD } from "radix-ui";
import { Card } from "./Card";
import { PropsWithoutRef } from "react";

interface AlertDialogTriggerProps {
    children?: React.ReactNode;
    clasName?: string;
    asChild?: boolean;
}

interface AlertDialogTitleProps {
    children?: React.ReactNode;
    className?: string;
}

interface AlertDialogContentProps {
    children?: React.ReactNode;
    className?: string;
}

interface AlertDialogCancelProps {
    children: React.ReactNode;
    className?: string;
}

interface AlertDialogCancelProps {
    children: React.ReactNode;
    className?: string;
}

interface AlertDialogActionProps
    extends Partial<Omit<PropsWithoutRef<HTMLButtonElement>, "children">> {
    children?: React.ReactNode;
}

interface AlertDialogProps {
    children?: React.ReactNode;
}

function AlertDialogTrigger({
    children,
    clasName,
    asChild = false,
}: AlertDialogTriggerProps) {
    return (
        <AD.Trigger className={`btn ${clasName}`} asChild={asChild}>
            {children}
        </AD.Trigger>
    );
}

function AlertDialogCancel({ children, className }: AlertDialogCancelProps) {
    return (
        <AD.Cancel className={`btn btn-neutral ${className}`}>
            {children}
        </AD.Cancel>
    );
}

function AlertDialogAction({
    children,
    className,
    type = "button",
    disabled = false,
}: AlertDialogActionProps) {
    return (
        <AD.Action
            className={`btn btn-primary ${className}`}
            type={type}
            disabled={disabled}
        >
            {children}
        </AD.Action>
    );
}

function AlertDialogTitle({ children, className }: AlertDialogTitleProps) {
    return (
        <AD.Title className={`text-2xl font-bold ${className}`}>
            {children}
        </AD.Title>
    );
}

function AlertDialogContent({ children, className }: AlertDialogContentProps) {
    return (
        <AD.Portal>
            <AD.Overlay className="fixed inset-0 bg-gray-900/75" />
            <AD.Content asChild>
                <Card
                    rootClassName={`fixed left-[40vw] top-[10vh] my-auto z-50 bg-slate-100 max-w-none w-[25vw] ${className}`}
                >
                    {children}
                </Card>
            </AD.Content>
        </AD.Portal>
    );
}

function AlertDialog({ children }: AlertDialogProps) {
    return <AD.Root>{children}</AD.Root>;
}

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction,
};
