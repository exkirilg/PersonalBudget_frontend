import { HttpRequest } from "../Services/HttpServices";

import { Operation } from "../Interfaces/Operation";

export interface OperationDataFromServer {
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

export const mapOperationFromServer = (operation: OperationDataFromServer): Operation => ({
    ...operation,
    date: new Date(operation.date)
});

export const getOperations = async (dateFrom: Date, dateTo: Date, search: string = ''): Promise<Operation[]> => {
    const result = await HttpRequest<OperationDataFromServer[]>({
        path: `/budgetoperations?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`
    });
    
    if (result.ok && result.body) {
        return result.body.map(mapOperationFromServer)
            .filter(operation => search === '' || operation.item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
    } else {
        return [];
    }
}

export const getOperationById = async (id: number): Promise<Operation | null> => {
    const result = await HttpRequest<OperationDataFromServer>({
        path: `/budgetoperations/${id}`
    });

    if (result.ok && result.body) {
        return mapOperationFromServer(result.body);
    } else {
        return null;
    }
}
