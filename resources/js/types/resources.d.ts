import { BaseModel, User } from ".";

export interface Incidence extends BaseModel {
    description: string;
    origin: string;
    notifier: string;
    priority: number;
    observations?: string;
    is_validated: boolean;
    validated_at?: string | Date;
    is_closed: boolean;
    closed_at?: string | Date;
}

export interface IncidenceWithRelations extends Incidence {
    creator: User;
    assigned_to?: User;
}

export interface IncidenceWithRelationsIds extends Incidence {
    creator_id: number;
    assigned_to_id?: number;
}
