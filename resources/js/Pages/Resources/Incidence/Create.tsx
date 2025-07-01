import { Card, CardTitle } from "@/Components/Card";
import { Select, SelectItem } from "@/Components/Forms/Select";
import {
    Input,
    InputWithInternalLabel,
    InputWithLabel,
} from "@/Components/Forms/Input";
import { Textarea } from "@/Components/Forms/Textarea";
import AdminLayout from "@/Layouts/Roles/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";

type CreateIncidenceForm = {
    created_at: string;
    creator_id: number;
    assigned_to_id?: number;
    description: string;
    origin: string;
    notifier: string;
    priority: number;
    observations?: string;
};

interface Props {
    aux: Record<string, any>;
}

function Create({ aux }: Props) {
    console.debug("aux:", aux);

    const { auth } = usePage().props;

    const { data, post, setData, errors } = useForm<CreateIncidenceForm>({
        created_at: new Date().toISOString(),
        creator_id: auth.user.id,
        assigned_to_id: 0,
        description: "",
        origin: "",
        notifier: "",
        priority: 0,
        observations: "",
    });
    console.debug("form data:", data);
    console.error("form errors:", errors);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (data.assigned_to_id === 0) {
            // If no user is assigned, set it to null
            setData("assigned_to_id", undefined);
        }

        post(route("incidence.store"));
    };

    return (
        <AdminLayout>
            <Card>
                <CardTitle>
                    <h1 className="font-bold text-4xl">
                        Registro de Nueva Incidencia
                    </h1>
                    <div className="basis-full flex gap-x-4 mt-2">
                        <InputWithInternalLabel label="Nº" className="input-sm">
                            <Input
                                className="input-sm"
                                value={aux.incidence_count + 1}
                                disabled
                            />
                        </InputWithInternalLabel>
                        <InputWithInternalLabel
                            label="Creada por:"
                            className="input-sm"
                        >
                            <Input
                                type="text"
                                className="input-sm"
                                value={auth.user.name}
                                disabled
                            />
                        </InputWithInternalLabel>
                        <InputWithInternalLabel
                            label="Fecha de alta:"
                            className="input-sm"
                        >
                            <Input
                                className="input-sm"
                                value={new Date(
                                    data.created_at
                                ).toLocaleString()}
                                disabled
                            />
                        </InputWithInternalLabel>
                    </div>
                </CardTitle>
                <div className="divider"></div>
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
                    onSubmit={submit}
                >
                    <InputWithLabel label="Origen *">
                        <Input
                            type="text"
                            className="input-bordered"
                            value={data.origin}
                            onChange={(e) => setData("origin", e.target.value)}
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Notificador *">
                        <Input
                            type="text"
                            className="input-bordered"
                            value={data.notifier}
                            onChange={(e) =>
                                setData("notifier", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel
                        label="Descripción *"
                        className="col-span-full"
                    >
                        <Textarea
                            className="textarea-bordered"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Prioridad">
                        <Input
                            type="number"
                            className="input-bordered"
                            value={data.priority}
                            onChange={(e) =>
                                setData("priority", parseInt(e.target.value))
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Asignada a:">
                        <Select
                            name="assigned_to"
                            defaultValue={String(data.assigned_to_id)}
                            onValueChange={(val) => {
                                console.debug("changing assigned_to...", {
                                    old: data.assigned_to_id,
                                    new: Number(val),
                                });
                                setData("assigned_to_id", Number(val));
                            }}
                        >
                            {/* Object iteration */}
                            {Object.entries(aux.users).map(([id, name]) => (
                                <SelectItem key={id} value={id}>
                                    {String(name)}
                                </SelectItem>
                            ))}
                        </Select>
                    </InputWithLabel>
                    <InputWithLabel
                        label="Observaciones"
                        className="col-span-full"
                    >
                        <Textarea
                            className="textarea-bordered"
                            value={data.observations}
                            onChange={(e) =>
                                setData("observations", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <div className="col-span-full flex gap-x-4 justify-end mt-4">
                        <p className="mt-auto">
                            Los campos con un (*) son obligatorios.
                        </p>
                        <button type="button" className="btn">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}

export default Create;
