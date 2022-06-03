import { BudgetOperation } from "../Interfaces/BudgetOperation"

{/*
export const getBudgetOperations = (dateFrom: Date, dateTo: Date, pageNumber: number, pageSize: number): BudgetOperation[] => {
    return budgetOperations.filter(operation => operation.date >= dateFrom && operation.date < dateTo);
};
*/}

export const getBudgetOperations = (): BudgetOperation[] => {
    return budgetOperations;
};

const budgetOperations: BudgetOperation[] = [
    {
        id: 1,
        date: new Date("2022-05-01T09:00:00Z"),
        type: 1,
        sum: 4700.27,
        item: {
            id: 4,
            name: "Groceries",
            type: 1
        }
    },
    {
        id: 2,
        date: new Date("2022-05-01T16:00:00Z"),
        type: 0,
        sum: 40000,
        item: {
            id: 1,
            name: "Salary",
            type: 0
        }
    },
    {
        id: 3,
        date: new Date("2022-05-08T09:00:00Z"),
        type: 1,
        sum: 3200.15,
        item: {
            id: 4,
            name: "Groceries",
            type: 1
        }
    },
    {
        id: 4,
        date: new Date("2022-05-15T09:00:00Z"),
        type: 1,
        sum: 5650.1,
        item: {
            id: 4,
            name: "Groceries",
            type: 1
        }
    },
    {
        id: 5,
        date: new Date("2022-05-16T12:00:00Z"),
        type: 0,
        sum: 40000,
        item: {
            id: 1,
            name: "Salary",
            type: 0
        }
    },
    {
        id: 6,
        date: new Date("2022-05-22T09:00:00Z"),
        type: 1,
        sum: 4899.8,
        item: {
            id: 4,
            name: "Groceries",
            type: 1
        }
    },
    {
        id: 7,
        date: new Date("2022-05-25T15:00:00Z"),
        type: 1,
        sum: 6329.15,
        item: {
            id: 5,
            name: "Utility bills",
            type: 1
        }
    },
    {
        id: 8,
        date: new Date("2022-05-25T15:00:00Z"),
        type: 1,
        sum: 25000,
        item: {
            id: 3,
            name: "Rent",
            type: 1
        }
    },
    {
        id: 9,
        date: new Date("2022-05-27T12:00:00Z"),
        type: 0,
        sum: 1753.21,
        item: {
            id: 2,
            name: "Deposit interest",
            type: 0
        }
    },
    {
        id: 10,
        date: new Date("2022-05-29T09:00:00Z"),
        type: 1,
        sum: 3733.24,
        item: {
            id: 4,
            name: "Groceries",
            type: 1
        }
    },
    {
        id: 11,
        date: new Date("2022-05-31T23:59:59Z"),
        type: 1,
        sum: 11250,
        item: {
            id: 6,
            name: "Entertaiments",
            type: 1
        }
    },
    {
        id: 12,
        date: new Date("2022-05-31T23:59:59Z"),
        type: 1,
        sum: 5700,
        item: {
            id: 7,
            name: "Misc",
            type: 1
        }
    }
];
