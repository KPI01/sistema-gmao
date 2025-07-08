import { Table } from "@/Components/DataTable/Table";
import Layout from "@/Layouts/Layout";
import { userColumns } from "@/Lib/Tables/ColDefs/User";
import { User } from "@/types";
import { usePage } from "@inertiajs/react";

interface Props {
    users: User[];
}

function Index({ users }: Props) {
    const { auth } = usePage().props;
    const { can } = auth;
    
    console.debug("data:", users);

    return (
        <Layout containerClass="flex flex-col">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-4xl">Usuarios</h1>
                {can.create.user && (
                    <a href={route("user.create")} className="btn btn-primary">
                        Nuevo usuario
                    </a>
                )}
            </div>
            <div className="divider"></div>
            <Table columns={userColumns({ can })} data={users} />
        </Layout>
    );
}

export default Index;
