export type Method = "get" | "post" | "put" | "patch" | "delete";

export interface BaseModel {
    id: integer;
    created_at: string;
    updated_at: string;
}

export interface User extends BaseModel {
    name: string;
    username: string;
    email: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
        can: {
            see: Record<string, boolean>;
            create: Record<string, boolean>;
            update: Record<string, boolean>;
            delete: Record<string, boolean>;
        };
    };
};
