import { Table } from "@/Components/DataTable/Table";
import Layout from "@/Layouts/Layout";
import { incidenceColumns } from "@/Lib/Tables/ColDefs/Incidence";
import { Incidence } from "@/types/resources";
import { usePage } from "@inertiajs/react";

interface Props {
    data: Incidence[];
}

function Index({ data }: Props) {
    const { auth } = usePage().props;
    const { can } = auth;

    return (
        <Layout containerClass="flex flex-col gap-y-4 max-h-screen">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-4xl">Incidencias</h1>
                {can.create.incidence &&
                    <a
                        href={route("incidence.create")}
                        className="btn btn-primary"
                    >
                        Nueva incidencia
                    </a>
                }
            </div>
            <hr />
            <Table columns={incidenceColumns} data={data} />
        </Layout>
    );
}

export default Index;
