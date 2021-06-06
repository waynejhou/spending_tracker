import { CreateColumnProps, datatype, constraint, CreateTableProps, createColumn } from "./utils/sqlStrings"

function getIDColumn<TColName>(): CreateColumnProps<TColName> {
    return {
        COLUMN_NAME: "Id" as unknown as TColName, DATA_TYPE: datatype("INTEGER"), CONSTRAINTS: [
            constraint("PRIMARY KEY", "ASC AUTOINCREMENT")
        ]
    }
}
function getFKIDColumn<TColName>(col:TColName, table:TableName): CreateColumnProps<TColName> {
    return {
        COLUMN_NAME: col, DATA_TYPE: datatype("INTEGER"), CONSTRAINTS:[
            constraint("REFERENCES", `${table} ( Id ) ON DELETE SET NULL`)
        ]
    }
}
function getRemarkColumn<TColName>(): CreateColumnProps<TColName> {
    return {
        COLUMN_NAME: "Remark" as unknown as TColName, DATA_TYPE: datatype("TEXT")
    }
}

const BalanceDataType = datatype("NUMERIC")

export type TableName =
    "Users"
    | "Tags"
    | "Transactions"
    | "TransactionTags"
    ;

export type UserColumnName =
    "Id"
    | "Name"
    | "DisplayName"
    | "Salt"
    | "Password"
    | "BaseBalance"
    | "Remark"
    ;

export const userColumns: CreateColumnProps<UserColumnName>[] = [
    getIDColumn<UserColumnName>(),
    {
        COLUMN_NAME: "Name", DATA_TYPE: datatype("NVARCHAR", 128), CONSTRAINTS: [
            constraint("UNIQUE"),
            constraint("NOT NULL")
        ]
    },
    {
        COLUMN_NAME: "DisplayName", DATA_TYPE: datatype("NVARCHAR", 128)
    },
    {
        COLUMN_NAME: "Salt", DATA_TYPE: datatype("BLOB")
    },
    {
        COLUMN_NAME: "Password", DATA_TYPE: datatype("BLOB")
    },
    {
        COLUMN_NAME: "BaseBalance", DATA_TYPE: BalanceDataType, CONSTRAINTS: [
            constraint("DEFAULT", 0)
        ]
    },
    getRemarkColumn<UserColumnName>(),
];

export type TagColumnName = 
    "Id"
    | "Name"
    | "Remark"
    ;

export const tagColumns: CreateColumnProps<TagColumnName>[] = [
    getIDColumn<TagColumnName>(),
    {
        COLUMN_NAME:"Name", DATA_TYPE: datatype("NVARCHAR", 128), CONSTRAINTS:[
            constraint("UNIQUE")
        ]
    },
    getRemarkColumn<TagColumnName>(),
]


export type TransactionColumnName =
    "Id"
    | "Type"
    | "Balance"
    | "Desciption"
    | "Remark"
    | "UserId"
    ;

export enum TransactionType {
    income, spending
}

export const transactionColumns: CreateColumnProps<TransactionColumnName>[] = [
    getIDColumn<TransactionColumnName>(),
    {
        COLUMN_NAME: "Type", DATA_TYPE: datatype("INTEGER"), CONSTRAINTS:[
            constraint("DEFAULT", TransactionType.spending)
        ]
    },
    {
        COLUMN_NAME: "Balance", DATA_TYPE: BalanceDataType, CONSTRAINTS:[
            constraint("DEFAULT", 0)
        ]
    },
    {
        COLUMN_NAME: "Desciption", DATA_TYPE: datatype("NVARCHAR", 280), CONSTRAINTS:[
            constraint("DEFAULT", 0)
        ]
    },
    getFKIDColumn<TransactionColumnName>("UserId", "Users"),
    getRemarkColumn<TransactionColumnName>(),
]

export type TransactionTagColumnName =
    "Id"
    | "Name"
    | "TagId"
    | "TransactionId"

export const transactionTagColumns:CreateColumnProps<TransactionTagColumnName>[] = [
    getIDColumn<TransactionTagColumnName>(),
    {
        COLUMN_NAME: "Name", DATA_TYPE: datatype("NVARCHAR", 128)
    },
    getFKIDColumn<TransactionTagColumnName>("TagId", "Tags"),
    getFKIDColumn<TransactionTagColumnName>("TransactionId", "Transactions"),
]





export const tables: CreateTableProps<TableName>[] = [
    {
        TABLE_NAME: "Users",
        COLUMNS: userColumns.map(x => createColumn(x)),
    },
    {
        TABLE_NAME: "Tags",
        COLUMNS: tagColumns.map(x => createColumn(x)),
    },
    {
        TABLE_NAME: "Transactions",
        COLUMNS: transactionColumns.map(x => createColumn(x)),
    },
    {
        TABLE_NAME: "TransactionTags",
        COLUMNS: transactionTagColumns.map(x => createColumn(x)),
    },
]