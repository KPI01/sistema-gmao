import AdminLayout from "@/Layouts/Roles/AdminLayout";
import {
    IncidenceWithRelations,
    IncidenceWithRelationsIds,
} from "@/types/resources";
import { useForm } from "@inertiajs/react";

interface Props {
    incidence: IncidenceWithRelationsIds & IncidenceWithRelations;
}

function Edit({ incidence }: Props) {
    console.debug("data:", incidence);

    const { data, setData } = useForm({
        description: incidence.description,
        observations: incidence.observations,
        origin: incidence.origin,
        notifier: incidence.notifier,
        priority: incidence.priority,
        is_validated: incidence.is_validated,
        validated_at: incidence.validated_at,
        is_closed: incidence.is_closed,
        closed_at: incidence.closed_at,
    } satisfies Omit<IncidenceWithRelationsIds, "id" | "created_at" | "updated_at" | "creator_id">);

    return (
        <AdminLayout>
            <div id="card" className="card mx-auto max-w-2xl mt-12">
                <div id="card-header">
                    <h1 id="card-title" className="text-2xl font-bold mb-4">
                        Incidencia Nº {incidence.id}
                    </h1>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
                            <label htmlFor="" className="font-bold">
                                Creada el:
                            </label>
                            <input
                                type="text"
                                className="text-sm"
                                value={new Date(
                                    incidence.created_at
                                ).toLocaleString()}
                                disabled
                            />
                        </div>
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
                            <label htmlFor="" className="font-bold">
                                Creada por:
                            </label>
                            <input
                                type="text"
                                className="text-sm"
                                value={incidence.creator.name}
                                disabled
                            />
                        </div>
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
                            <label htmlFor="" className="font-bold">
                                Noficado por:
                            </label>
                            <input
                                type="text"
                                className="text-sm"
                                value={incidence.notifier}
                                disabled
                            />
                        </div>
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
                            <label htmlFor="" className="font-bold">
                                Origen:
                            </label>
                            <input
                                type="text"
                                className="text-sm"
                                value={incidence.origin}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <hr className="col-span-full my-4" />
                <form className="grid gap-y-2">
                    <span className="font-bold">Descripción:</span>
                    <textarea
                        className="text-regular h-16 max-h-48 resize-y w-full border rounded p-2"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </form>
                <hr className="col-span-full my-4" />
                <div className="grid gap-y-2">
                    <span className="font-bold">Observaciones:</span>
                    <textarea
                        className="text-regular h-16 max-h-48 resize-y w-full border rounded p-2"
                        value={data.observations}
                        onChange={(e) =>
                            setData("observations", e.target.value)
                        }
                    />
                </div>
                <div className="flex justify-end p-2 align-center gap-x-4">
                    <a
                        className="btn no-underline bg-red-500 border-red-700 text-white hover:text-white hover:bg-red-800"
                        href={route("incidence.index")}
                    >
                        Cancelar
                    </a>
                    <input
                        className="bg-slate-700 text-white border-slate-900"
                        type="submit"
                        value="Guardar"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}

export default Edit;
