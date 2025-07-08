import { Card, CardTitle } from "@/Components/Card";
import { Select, SelectItem } from "@/Components/Forms/Select";
import Layout from "@/Layouts/Layout";
import {
    IncidenceWithRelations,
    IncidenceWithRelationsIds,
} from "@/types/resources";
import { router, useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";

interface Props {
    incidence: IncidenceWithRelationsIds & IncidenceWithRelations;
    aux: {
        users: { id: number; name: string }[];
    };
}

type UpdateIncidenceData = {
    description: string;
    observations?: string;
    priority?: number;
    assigned_to_id?: number;
};

function Edit({ incidence, aux }: Props) {
    console.debug("data:", incidence);
    console.debug("aux", aux);

    const { data, setData, isDirty, hasErrors, errors, put, processing } =
        useForm({
            description: incidence.description,
            observations: incidence.observations,
            priority: incidence.priority,
            assigned_to_id: incidence.assigned_to_id,
        } satisfies UpdateIncidenceData);

    console.error(errors);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.debug("sending form...", data);
        put(route("incidence.update", incidence.id));
    };

    const handleCancel = () => {
        router.visit(route("incidence.show", incidence.id));
    };

    return (
        <Layout>
            <Card>
                <CardTitle>
                    <div className="flex basis-full justify-between">
                        <h1 className="text-2xl font-bold mb-4">
                            Incidencia Nº {incidence.id}
                        </h1>
                        <div className="flex gap-x-4">
                            <label className="input input-bordered input-sm flex items-center gap-2">
                                <span className="font-bold">Creada el:</span>
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
                                <span className="font-bold">Creada por:</span>
                                <input
                                    type="text"
                                    className="grow"
                                    value={incidence.creator.name}
                                    disabled
                                />
                            </label>
                        </div>
                    </div>
                </CardTitle>
                <div className="grid gap-4">
                    <div className="grid">
                        <span className="font-bold mb-2 ">
                            Datos de recogida:
                        </span>
                        <div className="flex gap-x-4">
                            <label className="input input-sm input-bordered flex items-center gap-2">
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
                            <label className="input input-sm input-bordered flex items-center gap-2">
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
                <span className="font-bold mt-1">Estado de la incidencia:</span>
                <div className="grid gap-y-2">
                    <div className="flex items-center gap-x-8">
                        <div className="form-control">
                            <label className="input input-bordered label cursor-pointer flex gap-x-4">
                                <span className="label-text font-bold">
                                    Validada:
                                </span>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={incidence.is_validated}
                                    disabled
                                />
                            </label>
                        </div>
                        {incidence.is_validated && incidence.validated_at ? (
                            <>
                                <div className="form-control">
                                    <label className="input input-bordered label cursor-pointer flex gap-x-4">
                                        <span className="label-text font-bold">
                                            Fecha de validación:
                                        </span>
                                        <input
                                            type="text"
                                            value={new Date(
                                                incidence.validated_at
                                            )?.toLocaleString()}
                                            disabled
                                        />
                                    </label>
                                </div>
                                <button className="btn btn-xs btn-error">
                                    Invalidar
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex items-center gap-x-8">
                        <div className="form-control">
                            <label className="input input-bordered label cursor-pointer flex gap-x-4">
                                <span className="label-text font-bold">
                                    Cerrada:
                                </span>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={incidence.is_validated}
                                    disabled
                                />
                            </label>
                        </div>
                        {incidence.is_closed && incidence.closed_at ? (
                            <>
                                <div className="form-control">
                                    <label className="input input-bordered label cursor-pointer flex gap-x-4">
                                        <span className="label-text font-bold">
                                            Fecha de cierre:
                                        </span>
                                        <input
                                            type="text"
                                            value={new Date(
                                                incidence.closed_at
                                            )?.toLocaleString()}
                                            disabled
                                        />
                                    </label>
                                </div>
                                <button className="btn btn-xs btn-warning">
                                    Reabrir
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="divider mt-0"></div>
                <form className="grid gap-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-8">
                        <label htmlFor="assigned_to" className="form-control">
                            <span className="label font-bold">
                                Asignada a: *
                            </span>
                            <Select
                                name="assigned_to"
                                defaultValue={String(data.assigned_to_id)}
                                onValueChange={(val) => {
                                    console.debug("changing assigned_to...", {
                                        old: data.assigned_to_id,
                                        new: Number(val),
                                    });
                                    setData("assigned_to_id", Number(val));
                                }}
                            >
                                {/* Current assigned */}
                                <SelectItem
                                    value={String(incidence.assigned_to?.id)}
                                >
                                    {incidence.assigned_to?.name}
                                </SelectItem>
                                {/* Object iteration */}
                                {Object.entries(aux.users).map(([id, name]) => (
                                    <SelectItem key={id} value={id}>
                                        {String(name)}
                                    </SelectItem>
                                ))}
                            </Select>
                        </label>
                        <label className="form-control">
                            <span className="label font-bold">Prioridad *</span>
                            <input
                                name="priority"
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
                    </div>
                    <label className="form-control">
                        <span className="label font-bold">
                            Descripción de la incidencia *
                        </span>
                        <textarea
                            name="description"
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
                        <span className="label font-bold">Observaciones</span>
                        <textarea
                            name="obervations"
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
            </Card>
        </Layout>
    );
}

export default Edit;
