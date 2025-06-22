import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { AlertDialog } from "radix-ui";
import { PropsWithChildren } from "react";

interface DeleteRowProps extends PropsWithChildren {
    url: string;
    className?: string;
}

function DeleteRow({ children, url, className }: DeleteRowProps) {
    const handleDelete = (url: string) => {
        console.debug("Eliminando recurso...");
        router.delete(url, { preserveScroll: true });
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger
                className={`btn btn-error btn-xs text-slate-50 ${className}`}
            >
                <Trash size={16} />
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg bg-base-100 p-6 shadow-lg">
                    {children}
                    <div className="flex justify-end">
                        <AlertDialog.Cancel className="btn btn-secondary btn-xs">
                            Cancelar
                        </AlertDialog.Cancel>
                        <AlertDialog.Action
                            onClick={() => handleDelete(url)}
                            className="btn btn-error btn-xs"
                        >
                            Eliminar
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

export default DeleteRow;
