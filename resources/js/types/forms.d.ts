import { Asset } from "./resources";

export type EditAssetForm = Partial<
    Pick<
        Asset,
        | "description"
        | "name"
        | "brand"
        | "asset_code"
        | "model"
        | "manufacturer"
        | "observations"
        | "serial_number"
    >
>;
