import { Card, CardTitle } from "@/Components/Card";
import { Checkbox, CheckboxWithLabel } from "@/Components/Forms/Checkbox";
import DeleteButton from "@/Components/Resources/DeleteButton";
import AdminLayout from "@/Layouts/Roles/AdminLayout";
import { IncidenceWithRelations } from "@/types/resources";
import { router } from "@inertiajs/react";
import { Check, PenBox, X } from "lucide-react";
import { Tabs } from "radix-ui";

interface Props {
    incidence: IncidenceWithRelations;
}

function Show({ incidence }: Props) {
    const handleEditRedirect = () => {
        router.get(route("incidence.edit", incidence.id), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleIncidenceValidation = () => {
        if (incidence.is_validated) {
            console.warn("La incidencia ya está validada.");
            alert("La incidencia ya está validada.");
            return;
        }

        router.put(
            route("incidence.validate", incidence.id),
            {
                is_validated: true,
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleIncidenceClose = () => {
        if (incidence.is_closed) {
            console.warn("La incidencia ya está cerrada.");
            alert("La incidencia ya está cerrada.");
            return;
        }

        router.put(
            route("incidence.close", incidence.id),
            {
                is_closed: true,
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <AdminLayout>
            <Card>
                <CardTitle>
                    <div className="flex w-full justify-between">
                        <h1 className="text-2xl font-bold mb-4">
                            Incidencia Nº {incidence.id}
                        </h1>
                        <div id="actions" className="flex gap-x-2">
                            {!incidence.is_closed ? (
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={handleIncidenceClose}
                                >
                                    <X size={16} />
                                    Cerrar
                                </button>
                            ) : (
                                ""
                            )}
                            {!incidence.is_validated ? (
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleIncidenceValidation()}
                                >
                                    <Check size={16} />
                                    Validar
                                </button>
                            ) : (
                                ""
                            )}
                            <button
                                className="tooltip btn btn-info btn-sm"
                                data-tip="Editar"
                                onClick={handleEditRedirect}
                            >
                                <PenBox size={16} />
                            </button>
                            <DeleteButton
                                className="btn-sm"
                                url={route("incidence.destroy", incidence.id)}
                            >
                                ¿Estás seguro que deseas eliminar esta
                                incidencia? Una vez confirmes la eliminación,{" "}
                                <span className="font-semibold text-red-600">
                                    no se puede deshacer.
                                </span>
                            </DeleteButton>
                        </div>
                    </div>
                    <div className="basis-full flex flex-col gap-y-2">
                        <div>
                            <span className="font-bold">Estado: </span>
                            <span>
                                {!incidence.is_closed ? (
                                    <span className="text-yellow-600">
                                        Abierta
                                    </span>
                                ) : (
                                    <span className="text-red-500">
                                        Cerrada
                                    </span>
                                )}
                            </span>
                            {incidence.is_closed && incidence.closed_at ? (
                                <span className="ml-2">
                                    (Cerrada el{" "}
                                    {new Date(
                                        incidence.closed_at
                                    ).toLocaleString()}
                                    )
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span className="font-bold">Validada: </span>
                            <Checkbox
                                className="checkbox-info checkbox-sm cursor-default"
                                checked={incidence.is_validated}
                            />
                            {incidence.is_validated &&
                            incidence.validated_at ? (
                                <span>
                                    (
                                    {new Date(
                                        incidence.validated_at
                                    ).toLocaleString()}
                                    )
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </CardTitle>
                <Tabs.Root
                    id="card-body"
                    className="mt-3"
                    defaultValue="details"
                >
                    <Tabs.List className="tabs tabs-boxed mx-8 mb-4">
                        <Tabs.Trigger
                            value="details"
                            className="tab tab-active"
                        >
                            Detalles
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content
                        value="details"
                        className="px-4 grid grid-cols-[1fr_auto_1fr]"
                    >
                        <div>
                            <div className="flex gap-x-2">
                                <span className="font-semibold">
                                    Fecha de alta:
                                </span>
                                <span>
                                    {new Date(
                                        incidence.created_at
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex gap-x-2">
                                <span className="font-semibold">
                                    Últ. modificación:
                                </span>
                                <span>
                                    {new Date(
                                        incidence.created_at
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex gap-x-2">
                                <span className="font-semibold">
                                    Creada por:
                                </span>
                                <span>{incidence.creator.name}</span>
                            </div>
                        </div>
                        <hr className="divider divider-horizontal" />
                        <div>
                            <div className="flex gap-x-2">
                                <span className="font-semibold">Medio:</span>
                                <span>{incidence.origin}</span>
                            </div>
                            <div className="flex gap-x-2">
                                <span className="font-semibold">
                                    Quien avisa:
                                </span>
                                <span>{incidence.notifier}</span>
                            </div>
                        </div>
                        <hr className="col-span-full my-4" />
                        <div className="col-span-full grid space-y-2 w-full">
                            <div className="col-span-full flex flex-col gap-y-2">
                                <span className="font-semibold">
                                    Asignado a:
                                </span>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={incidence.assigned_to?.name}
                                    disabled
                                />
                            </div>
                            <div className="col-span-full flex flex-col gap-y-2">
                                <span className="font-semibold">
                                    Prioridad:
                                </span>
                                <input
                                    type="number"
                                    className="input input-bordered"
                                    value={incidence.priority}
                                    disabled
                                />
                            </div>
                            <div className="col-span-full flex flex-col gap-y-2">
                                <span className="font-semibold">
                                    Descripción:
                                </span>
                                <textarea
                                    className="textarea textarea-bordered"
                                    value={incidence.description}
                                    disabled
                                />
                            </div>
                            <div className="col-span-full flex flex-col gap-y-2">
                                <span className="font-semibold">
                                    Observaciones:
                                </span>
                                <textarea
                                    className="textarea textarea-bordered"
                                    value={
                                        incidence.observations ??
                                        "(Sin observaciones)"
                                    }
                                    disabled
                                />
                            </div>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </Card>
        </AdminLayout>
    );
}

export default Show;
