import { createColumnHelper } from "@tanstack/react-table";
import { Incidence } from "@/types/resources";
import GoToBtn from "@/Components/DataTable/GoToBtn";

const columnHelper = createColumnHelper<Incidence>();

export const incidenceColumns = [
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
        cell: (info) => (
            <GoToBtn
                to={route("incidence.show", info.row.original.id)}
                label="Ver"
            />
        ),
    }),
];
