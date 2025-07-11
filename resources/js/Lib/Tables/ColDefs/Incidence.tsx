import { createColumnHelper } from "@tanstack/react-table";
import { Incidence } from "@/types/resources";
import RedirectButton from "@/Components/DataTable/RedirectButton";
import { SquareArrowOutUpRight } from "lucide-react";

const columnHelper = createColumnHelper<Incidence>();

export const incidenceColumns = [
    columnHelper.accessor("id", {
        header: "Nro. de Incidencia",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("description", {
        header: "Descripción",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("origin", {
        header: "Origen",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("notifier", {
        header: "Notificador",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("priority", {
        header: "Prioridad",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("is_validated", {
        header: "Validada",
        cell: (info) => (info.getValue() ? "Sí" : "No"),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("is_closed", {
        header: "Cerrada",
        cell: (info) => (info.getValue() ? "Sí" : "No"),
        enableColumnFilter: true,
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end gap-x-2">
                <RedirectButton
                    url={route("incidence.show", row.original.id)}
                    className="btn-neutral btn-xs"
                >
                    <SquareArrowOutUpRight size={16} />
                </RedirectButton>
            </div>
        ),
    }),
];
