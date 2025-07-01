import { router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { AlertDialog } from "radix-ui";
import { PropsWithChildren } from "react";

interface DeleteButtonProps extends PropsWithChildren {
    url: string;
    className?: string;
    iconSize?: number;
}

function DeleteButton({
    children,
    url,
    className,
    iconSize = 16,
}: DeleteButtonProps) {
    const handleDeletion = () => {
        console.debug("deleting resource...");
        router.delete(url, { preserveScroll: true });
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button
                    className={`tooltip btn btn-error ${className}`}
                    data-tip="Eliminar"
                >
                    <Trash2 size={iconSize} />
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg bg-base-100 p-6 shadow-lg">
                    <AlertDialog.Title className="text-lg font-bold">
                        Confirmar eliminación
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-2">
                        {children}
                    </AlertDialog.Description>
                    <div className="flex justify-end mt-4">
                        <AlertDialog.Cancel className="btn btn-sm mr-2">
                            Cancelar
                        </AlertDialog.Cancel>
                        <AlertDialog.Action
                            className="btn btn-error btn-sm"
                            onClick={() => handleDeletion()}
                        >
                            Eliminar
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

export default DeleteButton;
