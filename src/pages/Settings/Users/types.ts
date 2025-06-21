export type Role = {
    id: number;
    name: string;
};

export type UserData = {
    id: number;
    name: string;
    login: string;
    role_id: number;
    status: number | boolean;
    is_admin: number | boolean;
    is_active: number | boolean;
    created_at: string;
    updated_at: string;
    company_id?: number;
};
