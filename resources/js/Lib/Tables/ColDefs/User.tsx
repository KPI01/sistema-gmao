import { MenuItem, RowMenu } from "@/Components/DataTable/RowMenu";
import { User } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";

const columnHelper = createColumnHelper<User>();

const menuOptions: MenuItem[] = [
    { children: <button>Reestablecer contraseña</button> },
    { children: <button>Editar usuario</button> },
    { children: <button>Eliminar usuario</button> },
];

export const userColumns = [
    columnHelper.accessor("username", {
        header: "Nombre de Usuario",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("name", {
        header: "Nombre",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("email", {
        header: "Correo Electrónico",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <RowMenu icon={<Ellipsis />} items={menuOptions} />,
    }),
];
