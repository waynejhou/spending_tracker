import { throwError } from "./throw";

type SelectQueryDelegate = (query: {
    SELECT: string
    , FROM: string
    , WHERE: string
    , GROUP_BY?: string
    , ORDER_BY?: string
}) => string

export const createSelect: SelectQueryDelegate = (query) => {
    return [
        query.SELECT ? `SELECT ${query.SELECT}` : throwError(new Error("Need SELECT on building Select String"))
        , query.FROM ? ` FROM ${query.FROM}` : throwError(new Error("Need FROM on building Select String"))
        , query.WHERE ? ` WHERE ${query.WHERE}` : throwError(new Error("Need WHERE on building Select String"))
        , query.GROUP_BY ? `GROUP BY ${query.GROUP_BY}` : ""
        , query.ORDER_BY ? `ORDER BY ${query.ORDER_BY}` : ""
        , ";"
    ].join("\n");
}

export function constraint(type: "CONSTRAINT", name: string): string;
export function constraint(type: "PRIMARY KEY", order_and_conflic_clause?: string): string;
export function constraint(type: "NOT NULL", conflic_clause?: string): string;
export function constraint(type: "UNIQUE", conflic_clause?: string): string;
export function constraint(type: "CHECK", expr: string | number): string;
export function constraint(type: "DEFAULT", value_or_expr: string | number): string;
export function constraint(type: "COLLATE", collation_name: string): string;
export function constraint(type: "REFERENCES", foreing_key_clause: string): string;
export function constraint(type: "GENERATED ALWAYS AS", expr_and_type: string | number): string;
export function constraint(type: "AS", expr_and_type: string): string;
export function constraint(type: any, value: any) {
    return `${type} ` + (value != undefined && value != null ? value : "");
}

type DataType =
    "TEXT" | "NUMERIC" | "INTEGER" | "REAL" | "BLOB"
    | "INT" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | "BIGINT" | "UNSIGNED BIG INT" | "INT2" | "INT8"
    | "CLOB"
    | "DOUBLE" | "DOUBLE PRECISION" | "FLOAT"
    | "BOOLEAN" | "DATE" | "DATETIME"

type DataType1 =
    "CHARACTER" | "VARCHAR" | "VARYING CHARACTER" | "NCHAR" | "NATIVE CHARACTER" | "NVARCHAR"

type DataType2 =
    "DECIMAL"

export function datatype(type: DataType, _1?: never, _2?: never): string;
export function datatype(type: DataType1, val1: any, _2?: never): string;
export function datatype(type: DataType2, val1: any, val2: any): string;
export function datatype(type: DataType | DataType1 | DataType2, val1: any, val2: any): string {
    if (val1 != undefined && val1 != null) {
        return `${type}(${val1})`
    }
    if ((val1 != undefined && val1 != null) && (val2 != undefined && val2 != null)) {
        return `${type}(${val1}, ${val2})`
    }
    return `${type}`
}

export type CreateColumnProps<TColName> = {
    COLUMN_NAME: TColName
    , DATA_TYPE: string
    , CONSTRAINTS?: string[]
}

export function createColumn<TColName>(props: CreateColumnProps<TColName>): string {
    return `${props.COLUMN_NAME} ${props.DATA_TYPE} ${props.CONSTRAINTS?.join(" ") ?? ""}`;
}

export type CreateTableProps<TTableName> = {
    TEMP?: boolean
    IF_NOT_EXISTS?: boolean
    , SCHEMA_NAME?: string
    , TABLE_NAME: TTableName
    , COLUMNS: string[]
    , CONSTRAINTS?: string[]
}

export function createTable<TTableName>(props: CreateTableProps<TTableName>): string {
    return [
        `CREATE ${props.TEMP ? "TEMP" : ""} TABLE ${props.IF_NOT_EXISTS ? "IF NOT EXISTS" : ""} ${props.SCHEMA_NAME ? props.SCHEMA_NAME + '.' : ""}${props.TABLE_NAME ?? throwError(new Error("Need TABLE_NAME"))} (`
        , props.COLUMNS.join(",\n    ")
        , props.CONSTRAINTS?.join(",\n    ") ?? ""
        , ");"
    ].filter(x => x).join("\n    ");
}