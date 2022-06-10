import { HttpRequest } from "../Services/HttpServices";

import { BudgetOperation } from "../Interfaces/BudgetOperation";

export interface BudgetOperationDataFromServer {
    id: number,
    date: Date,
    type: number,
    sum: number,
    item: {
        id: number,
        name: string,
        type: number
    };
}

export const mapBudgetOperationFromServer = (operation: BudgetOperationDataFromServer): BudgetOperation => ({
    ...operation,
    date: new Date(operation.date)
});

export const getBudgetOperations = async (dateFrom: Date, dateTo: Date, search: string = ''): Promise<BudgetOperation[]> => {
    const result = await HttpRequest<BudgetOperationDataFromServer[]>({
        path: `/budgetoperations?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`
    });
    
    if (result.ok && result.body) {
        return result.body.map(mapBudgetOperationFromServer)
            .filter(operation => search === '' || operation.item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
    } else {
        return [];
    }
}

export const getBudgetOperationById = async (id: number): Promise<BudgetOperation | null> => {
    const result = await HttpRequest<BudgetOperationDataFromServer>({
        path: `/budgetoperations/${id}`
    });

    if (result.ok && result.body) {
        return mapBudgetOperationFromServer(result.body);
    } else {
        return null;
    }
}
