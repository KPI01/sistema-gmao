import AdminLayout from "@/Layouts/Roles/AdminLayout";
import {
    IncidenceWithRelations,
    IncidenceWithRelationsIds,
} from "@/types/resources";
import { router, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

interface Props {
    incidence: IncidenceWithRelationsIds & IncidenceWithRelations;
}

type UpdateIncidenceData = {
    description: string;
    observations?: string;
    priority?: number;
};

function Edit({ incidence }: Props) {
    console.debug("data:", incidence);

    const { data, setData, isDirty, hasErrors, errors, put, processing } =
        useForm({
            description: incidence.description,
            observations: incidence.observations,
            priority: incidence.priority,
        } satisfies UpdateIncidenceData);

    console.error(errors);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.debug("Enviando formulario con datos...", data);
        put(route("incidence.update", incidence.id));
    };

    const handleCancel = () => {
        router.visit(route("incidence.show", incidence.id));
    };

    return (
        <AdminLayout>
            <div className="card card-bordered border-2 border-slate-200 max-w-[70%] shadow-lg mx-auto">
                <div className="card-body">
                    <div className="card-title justify-between">
                        <div className="flex basis-full justify-between">
                            <h1 className="text-2xl font-bold mb-4">
                                Incidencia Nº {incidence.id}
                            </h1>
                            <div className="flex gap-x-4">
                                <label className="input input-bordered input-sm flex items-center gap-2">
                                    <span className="font-bold">
                                        Creada el:
                                    </span>
                                    <input
                                        type="text"
                                        className="grow"
                                        value={new Date(
                                            incidence.created_at
                                        ).toLocaleString()}
                                        disabled
                                    />
                                </label>
                                <label className="input input-bordered input-sm flex items-center gap-2">
                                    <span className="font-bold">
                                        Creada por:
                                    </span>
                                    <input
                                        type="text"
                                        className="grow"
                                        value={incidence.creator.name}
                                        disabled
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <span className="font-bold mb-2">
                        Estado de la incidencia:
                    </span>
                    <div className="flex justify-evenly gap-x-12">
                        <div className="flex justify-between basis-full gap-x-4">
                            <div className="form-control">
                                <label className="cursor-pointer label gap-x-2">
                                    <input
                                        type="checkbox"
                                        checked={incidence.is_closed}
                                        className="checkbox checkbox-lg"
                                        disabled
                                    />
                                    <span className="label-text text-xl font-semibold">
                                        Cerrada
                                    </span>
                                </label>
                            </div>
                            {incidence.is_closed ? (
                                <button className="btn btn-warning">
                                    Reabrir
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex justify-between basis-full">
                            <div className="form-control">
                                <label className="cursor-pointer label gap-x-2">
                                    <input
                                        type="checkbox"
                                        checked={incidence.is_closed}
                                        className="checkbox checkbox-lg"
                                        disabled
                                    />
                                    <span className="label-text text-xl font-semibold">
                                        Validada
                                    </span>
                                </label>
                            </div>
                            {incidence.is_validated ? (
                                <button className="btn btn-error">
                                    Invalidar
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid gap-4">
                        <div className="grid">
                            <span className="font-bold mb-2">
                                Datos de recogida:
                            </span>
                            <div className="flex gap-x-4">
                                <label className="input input-bordered flex items-center gap-2">
                                    <span className="font-bold">
                                        Notificado por:
                                    </span>
                                    <input
                                        type="text"
                                        className="grow"
                                        value={incidence.notifier}
                                        disabled
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <span className="font-bold">Origen:</span>
                                    <input
                                        type="text"
                                        className="grow"
                                        value={incidence.origin}
                                        disabled
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className="col-span-full my-4" />
                    <form className="grid gap-y-4" onSubmit={handleSubmit}>
                        <label className="form-control">
                            <span className="label font-bold">Prioridad *</span>
                            <input
                                className="input input-bordered"
                                type="number"
                                value={data.priority ?? 1}
                                onChange={(e) =>
                                    setData("priority", Number(e.target.value))
                                }
                            />
                            {errors?.priority && (
                                <span className="text-red-500 text-sm">
                                    {errors.priority}
                                </span>
                            )}
                        </label>
                        <label className="form-control">
                            <span className="label font-bold">
                                Descripción de la incidencia *
                            </span>
                            <textarea
                                className="textarea textarea-bordered h-24 max-h-48"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Describe la incidencia aquí..."
                            />
                            {errors?.description && (
                                <span className="text-red-500 text-sm">
                                    {errors.description}
                                </span>
                            )}
                        </label>
                        <label className="form-control">
                            <span className="label font-bold">
                                Observaciones
                            </span>
                            <textarea
                                className="textarea textarea-bordered h-24 max-h-48"
                                value={data.observations ?? ""}
                                onChange={(e) =>
                                    setData("observations", e.target.value)
                                }
                                placeholder="Coloca las observaciones aquí"
                            />
                        </label>
                        <div className="flex mt-4 justify-end gap-x-6 align-center">
                            <div className="text-sm text-slate-500 me-auto mt-auto">
                                Los campos marcados con * son obligatorios.
                            </div>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => handleCancel()}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                // disabled={!isDirty || hasErrors}
                            >
                                {processing && (
                                    <span className="loading loading-spinner loading-sm"></span>
                                )}
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Edit;
