import AdminLayout from "@/Layouts/Roles/AdminLayout";
import { IncidenceWithRelations } from "@/types/resources";
import { router } from "@inertiajs/react";
import { Check, Cross, PenBox, X } from "lucide-react";
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

    const handleIncidenceValidation = () => {};

    const handleIncidenceClose = () => {};

    return (
        <AdminLayout>
            <div className="card shadow-lg mx-auto">
                <div className="card-body">
                    <div className="card-title flex-wrap">
                        <div className="flex w-full justify-between">
                            <h1
                                id="card-title"
                                className="text-2xl font-bold mb-4"
                            >
                                Incidencia Nº {incidence.id}
                            </h1>
                            <div id="actions" className="flex gap-x-2">
                                {!incidence.is_closed ? (
                                    <button
                                        className="btn btn-error"
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
                                        className="btn btn-success"
                                        onClick={handleIncidenceValidation}
                                    >
                                        <Check size={16} />
                                        Validar
                                    </button>
                                ) : (
                                    ""
                                )}
                                <button
                                    className="btn btn-info"
                                    onClick={handleEditRedirect}
                                >
                                    <PenBox size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="basis-full flex gap-x-4">
                            <div>
                                <span className="font-bold">Estado: </span>
                                <span>
                                    {!incidence.is_closed ? (
                                        "Abierta"
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
                            <div>
                                <span className="font-bold">Validada: </span>
                                <span>
                                    {incidence.is_validated ? "Sí" : "No"}{" "}
                                    {incidence.is_validated ? (
                                        <>({incidence.validated_at})</>
                                    ) : (
                                        ""
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Tabs.Root
                        id="card-body"
                        className="mt-3"
                        defaultValue="details"
                    >
                        <Tabs.List className="tabs">
                            <Tabs.Trigger value="details" className="tab">
                                Detalles
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content
                            value="details"
                            className="px-4 grid grid-cols-2"
                        >
                            <div className="col-span-full grid grid-cols-2">
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
                                <div className="flex gap-x-2 justify-end">
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
                            <hr className="col-span-full my-4" />
                            <div className="col-span-full flex justify-between flex-wrap gap-x-2">
                                <div className="basis-full font-bold mb-2">
                                    Datos de recogida
                                </div>
                                <div className="flex gap-x-2">
                                    <span className="font-semibold">
                                        Medio:
                                    </span>
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
                            <div className="col-span-full flex flex-col gap-y-2">
                                <span className="font-semibold">
                                    Descripción:
                                </span>
                                <div className="rounded border border-slate-300 bg-slate-100 p-2">
                                    <p>{incidence.description}</p>
                                </div>
                            </div>
                            <hr className="col-span-full my-4" />
                            <div className="col-span-full flex flex-col gap-y-2">
                                <span className="font-semibold">
                                    Observaciones:
                                </span>
                                <div className="rounded border border-slate-300 bg-slate-100 p-2">
                                    {incidence.observations &&
                                    incidence.observations.length > 0 ? (
                                        <p>{incidence.observations}</p>
                                    ) : (
                                        <p className="text-slate-400">
                                            (Observaciones)
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Show;
