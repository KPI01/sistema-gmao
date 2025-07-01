import { Table } from "@/Components/DataTable/Table";
import AdminLayout from "@/Layouts/Roles/AdminLayout";
import { incidenceColumns } from "@/Lib/Tables/ColDefs/Incidence";
import { Incidence } from "@/types/resources";

interface Props {
    data: Incidence[];
}

function Index({ data }: Props) {
    return (
        <AdminLayout containerClass="flex flex-col gap-y-4 max-h-screen">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-4xl">Incidencias</h1>
                <a href={route("incidence.create")} className="btn btn-primary">Nueva incidencia</a>
            </div>
            <hr />
            <Table columns={incidenceColumns} data={data} />
        </AdminLayout>
    );
}

export default Index;
