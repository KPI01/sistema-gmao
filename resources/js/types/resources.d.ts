import { BaseModel, User } from ".";

export interface Incidence extends BaseModel {
    description: string;
    origin: string;
    notifier: string;
    priority: number;
    observations?: string;
    is_validated: boolean;
    validated_at?: string;
    is_closed: boolean;
    closed_at?: string;
}

export interface IncidenceWithRelations extends Incidence {
    creator: User;
    assigned_to?: User;
}

export interface IncidenceWithRelationsIds extends Incidence {
    creator_id: number;
    assigned_to_id?: number;
}

export interface Asset extends BaseModel {
    asset_code:string;
    name: string;
    description?: string;
    brand?: string;
    model?: string;
    serial_number?: string;
    manufacturer?: string;
    is_active: boolean;
    observations?: string;
    deleted_at?: string|Date;
}
