import { Table } from "@/Components/DataTable/Table";
import AdminLayout from "@/Layouts/Roles/AdminLayout";
import { userColumns } from "@/Lib/Tables/ColDefs/User";
import { User } from "@/types";

interface Props {
    users: User[];
}

function Index({ users }: Props) {
    console.debug("data:", users);

    return (
        <AdminLayout containerClass="flex flex-col">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-4xl">Usuarios</h1>
                <a href="#" className="btn btn-primary">
                    Nuevo usuario
                </a>
            </div>
            <div className="divider"></div>
            <Table columns={userColumns} data={users} />
        </AdminLayout>
    );
}

export default Index;
