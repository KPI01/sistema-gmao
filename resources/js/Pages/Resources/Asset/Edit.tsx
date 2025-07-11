import { Card, CardTitle } from "@/Components/Card";
import {
    Input,
    InputWithInternalLabel,
    InputWithLabel,
} from "@/Components/Forms/Input";
import { Textarea } from "@/Components/Forms/Textarea";
import Layout from "@/Layouts/Layout";
import { EditAssetForm } from "@/types/forms";
import { Asset } from "@/types/resources";
import { useForm } from "@inertiajs/react";
import { CircleCheck, CircleX, Trash } from "lucide-react";
import { FormEvent } from "react";

interface Props {
    asset: Asset;
}

function Edit({ asset }: Props) {
    const { data, setData, isDirty, processing, put } = useForm<EditAssetForm>({
        description: asset.description,
        name: asset.name,
        brand: asset.brand,
        asset_code: asset.asset_code,
        model: asset.model,
        manufacturer: asset.manufacturer,
        observations: asset.observations,
        serial_number: asset.serial_number,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.debug("updating asset with", data);
    };

    return (
        <Layout>
            <Card className="max-h-[95vh] overflow-y-auto overflow-x-hidden">
                <CardTitle className="flex-wrap">
                    <h1 className="text-4xl font-bold">Ficha del Activo</h1>
                    <div className="ms-auto flex items-center justify-end gap-x-2">
                        <button
                            type="button"
                            className={`tooltip btn btn-sm ${
                                asset.is_active ? "btn-warning" : "btn-info"
                            }`}
                            data-tip={`${
                                asset.is_active ? "Desactivar" : "Activar"
                            } el activo`}
                        >
                            {asset.is_active ? (
                                <CircleX size={16} />
                            ) : (
                                <CircleCheck size={16} />
                            )}
                        </button>
                        <button
                            type="button"
                            className="tooltip btn btn-sm btn-error"
                            data-tip="Eliminar"
                        >
                            <Trash size={16} />
                        </button>
                    </div>
                </CardTitle>
                <div className="divider my-1"></div>
                <div className="flex gap-x-4 my-0">
                    <InputWithInternalLabel
                        label="Creado:"
                        className="input-sm"
                    >
                        <Input
                            name="created_at"
                            className="input-sm"
                            value={new Date(asset.created_at).toLocaleString()}
                            disabled
                        />
                    </InputWithInternalLabel>
                    <InputWithInternalLabel
                        label="Últ. Edición:"
                        className="input-sm"
                    >
                        <Input
                            name="updated_at"
                            className="input-sm"
                            value={new Date(asset.updated_at).toLocaleString()}
                            disabled
                        />
                    </InputWithInternalLabel>
                    <InputWithInternalLabel
                        label="Estado:"
                        className="input-sm"
                    >
                        <Input
                            name="updated_at"
                            className="input-sm"
                            value={asset.is_active ? "Activo" : "Inactivo"}
                            disabled
                        />
                    </InputWithInternalLabel>
                </div>
                <div className="divider my-1"></div>
                <form
                    className="grid md:grid-cols-2 gap-x-6"
                    onSubmit={handleSubmit}
                >
                    <InputWithLabel label="Código de Activo">
                        <Input
                            name="asset_code"
                            className="input-bordered"
                            value={data.asset_code}
                            onChange={(e) =>
                                setData("asset_code", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Nombre del activo">
                        <Input
                            name="description"
                            className="input-bordered"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </InputWithLabel>
                    <InputWithLabel
                        label="Descripción"
                        className="col-span-full"
                    >
                        <Textarea
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="textarea-bordered"
                            rows={4}
                        />
                    </InputWithLabel>
                    <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-x-4">
                        <InputWithLabel label="Marca">
                            <Input
                                name="brand"
                                className="input-bordered"
                                value={data.brand}
                                onChange={(e) =>
                                    setData("brand", e.target.value)
                                }
                            />
                        </InputWithLabel>
                        <InputWithLabel label="Modelo">
                            <Input
                                name="model"
                                className="input-bordered"
                                value={data.model}
                                onChange={(e) =>
                                    setData("model", e.target.value)
                                }
                            />
                        </InputWithLabel>
                        <InputWithLabel label="Número de Serial">
                            <Input
                                name="serial_number"
                                className="input-bordered"
                                value={data.serial_number}
                                onChange={(e) =>
                                    setData("serial_number", e.target.value)
                                }
                            />
                        </InputWithLabel>
                    </div>
                    <InputWithLabel
                        label="Observaciones"
                        className="col-span-full"
                    >
                        <Textarea
                            name="observations"
                            value={data.observations}
                            onChange={(e) =>
                                setData("observations", e.target.value)
                            }
                            className="textarea-bordered"
                            rows={4}
                        />
                    </InputWithLabel>
                    <div className="col-span-full mt-8 flex items-center justify-end gap-x-6">
                        <a
                            href={route("asset.index")}
                            type="button"
                            className="btn btn-neutral"
                        >
                            Cancelar
                        </a>
                        <button
                            type="submit"
                            className="tooltip btn btn-primary"
                            disabled={processing || !isDirty}
                            data-tip={
                                isDirty
                                    ? "Procesar cambios"
                                    : "No se han hecho cambios"
                            }
                        >
                            {processing && (
                                <span className="loading loading-spinner me-2"></span>
                            )}
                            Guardar
                        </button>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}

export default Edit;
