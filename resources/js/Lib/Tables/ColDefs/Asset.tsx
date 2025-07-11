import { PageProps } from "@/types";
import { Asset } from "@/types/resources";
import { createColumnHelper } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";

const columnHelper = createColumnHelper<Asset>();

export const assetColumns = (can: PageProps["auth"]["can"]) => [
    columnHelper.accessor("asset_code", {
        header: "Código",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("name", {
        header: "Nombre",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("brand", {
        header: "Marca",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.accessor("model", {
        header: "Modelo",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
            <a
                href={route(
                    can.update.asset ? "asset.edit" : "asset.show",
                    row.original.id
                )}
                className="btn btn-sm btn-neutral"
            >
                <SquareArrowOutUpRight size={16} />
            </a>
        ),
    }),
];
