import { MenuItem } from "@/Components/DataTable/RowMenu";
import { User } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import {  SquareArrowOutUpRight } from "lucide-react";

const columnHelper = createColumnHelper<User>();

type UserColumn = ({
    can,
}: {
    can: Record<string, Record<string, boolean>>;
}) => Array<any>;

export const userColumns: UserColumn = ({ can }) => [
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
        cell: ({ row }) => (
            <a
                href={route(
                    can.update ? "user.edit" : "user.show",
                    row.original.id
                )}
                className="btn btn-sm btn-neutral"
            >
                <SquareArrowOutUpRight size={16} />
            </a>
        ),
    }),
];
