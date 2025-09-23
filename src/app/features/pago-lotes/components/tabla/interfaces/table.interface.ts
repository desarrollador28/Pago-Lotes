
export interface CustomColumn {
    field: string;
    header: string;
    pipe?: 'currency' | 'date' | string;
}