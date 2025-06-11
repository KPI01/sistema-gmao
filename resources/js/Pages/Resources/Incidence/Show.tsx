import AdminLayout from "@/Layouts/Roles/AdminLayout";
import { IncidenceWithRelations } from "@/types/resources";

interface Props {
    incidence: IncidenceWithRelations;
}

function Show({ incidence }: Props) {
    return (
        <AdminLayout>
            <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Detalles de la incidencia
                </h1>
                <dl className="space-y-2">
                    <div>
                        <dt className="font-semibold">Descripción:</dt>
                        <dd>{incidence.description}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Origen:</dt>
                        <dd>{incidence.origin}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Notificador:</dt>
                        <dd>{incidence.notifier}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Prioridad:</dt>
                        <dd>{incidence.priority}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Observaciones:</dt>
                        <dd>{incidence.observations ?? "-"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Validada:</dt>
                        <dd>{incidence.is_validated ? "Sí" : "No"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Fecha validación:</dt>
                        <dd>
                            {incidence.validated_at
                                ? new Date(
                                      incidence.validated_at
                                  ).toLocaleString()
                                : "-"}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Cerrada:</dt>
                        <dd>{incidence.is_closed ? "Sí" : "No"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Fecha cierre:</dt>
                        <dd>
                            {incidence.closed_at
                                ? new Date(incidence.closed_at).toLocaleString()
                                : "-"}
                        </dd>
                    </div>
                </dl>
            </div>
        </AdminLayout>
    );
}

export default Show;
