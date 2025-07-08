import { Card, CardTitle } from "@/Components/Card";
import Layout from "@/Layouts/Layout";
import { User } from "@/types";

interface Props {
    user: User;
}

function Show({ user }: Props) {
    console.debug("data:", user);

    return (
        <Layout>
            <Card>
                <CardTitle>Usuario ID: {user.id}</CardTitle>
                <div className="divider"></div>
            </Card>
        </Layout>
    );
}

export default Show;
