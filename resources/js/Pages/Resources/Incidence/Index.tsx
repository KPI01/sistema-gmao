import { Table } from "@/Components/DataTable/Table";
import AdminLayout from "@/Layouts/Roles/AdminLayout";
import { incidenceColumns } from "@/Lib/Tables/ColDefs/Incidence";
import { Incidence } from "@/types/resources";

interface Props {
    data: Incidence[];
}

function Index({ data }: Props) {
    return (
        <AdminLayout>
            <Table columns={incidenceColumns} data={data} />
        </AdminLayout>
    );
}

export default Index;
