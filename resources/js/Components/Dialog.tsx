import { Dialog as D } from "radix-ui";
import { Card } from "./Card";

interface DialogTriggerProps {
    children?: React.ReactNode;
    className?: string;
}

interface DialogContentProps {
    children?: React.ReactNode;
    className?: string;
}

interface DialogProps {
    children?: React.ReactNode;
}

function DialogTrigger({ children, className }: DialogTriggerProps) {
    return <D.Trigger className={`btn ${className}`}>{children}</D.Trigger>;
}

function DialogContent({ children, className }: DialogContentProps) {
    return (
        <D.Portal>
            <D.Overlay />
            <D.Content asChild>
                <Card className={className}>{children}</Card>
            </D.Content>
        </D.Portal>
    );
}

function Dialog({ children }: DialogProps) {
    return <D.Root>{children}</D.Root>;
}

export { Dialog, DialogTrigger, DialogContent };
