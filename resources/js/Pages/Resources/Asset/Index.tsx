import { Table } from "@/Components/DataTable/Table";
import Layout from "@/Layouts/Layout";
import { assetColumns } from "@/Lib/Tables/ColDefs/Asset";
import { Asset } from "@/types/resources";
import { usePage } from "@inertiajs/react";

interface Props {
    assets: Asset[];
}

function Index({ assets }: Props) {
    const { auth } = usePage().props;
    const { can } = auth;

    console.debug("data:", assets);

    return (
        <Layout>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-4xl">Activos de la Empresa</h1>
                {can.create.asset && (
                    <button type="button" className="btn btn-primary">
                        Nuevo activo
                    </button>
                )}
            </div>
            <div className="divider"></div>
            <Table columns={assetColumns(can)} data={assets} />
        </Layout>
    );
}

export default Index;
