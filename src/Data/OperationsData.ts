import { Item } from "../Models/Item";
import { Operation } from "../Models/Operation";
import { OperationType } from "../Models/OperationType";
import { makeHttpRequest } from "../Services/HttpServices";
import { postItem } from "./ItemsData";

export interface OperationDTO_Get {
    id: number,
    date: Date,
    type: OperationType,
    sum: number,
    item: {
        id: number,
        name: string,
        type: OperationType
    }
}
export interface OperationDTO_Post {
    date: Date,
    itemId: number,
    sum: number
}

export const mapOperationDTO = (operation: OperationDTO_Get): Operation => {
    return new Operation(
    {
        id: operation.id,
        date: new Date(operation.date),
        type: operation.type,
        sum: operation.sum,
        item: operation.item
    });
}

export const getOperations = async (dateFrom: Date, dateTo: Date): Promise<Operation[]> => {
    const result = await makeHttpRequest<OperationDTO_Get[]>({
        path: `/operations?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`
    });
    
    if (result.ok && result.body) {
        return result.body.map(mapOperationDTO);
    } else {
        return [];
    }
}

export const getOperationById = async (id: number): Promise<Operation | null> => {
    const result = await makeHttpRequest<OperationDTO_Get>({
        path: `/operations/${id}`
    });

    if (result.ok && result.body) {
        return mapOperationDTO(result.body);
    }
    else {
        return null;
    }
}

export const postOperation = async (operation: Operation): Promise<Operation | null> => {
    
    let itemId = await ensureItem(operation.item!);
    
    const result = await makeHttpRequest<OperationDTO_Get, OperationDTO_Post>({
        path: `/operations/${operation.type.toString()}s`,
        method: "post",
        body: {
            date: operation.date,
            itemId: itemId,
            sum: operation.sum
        }
    });

    if (result.ok && result.body) {
        return mapOperationDTO(result.body);
    }
    else {
        return null;
    }
}

export const putOperation = async (operation: Operation): Promise<Operation | null> => {

    let itemId = await ensureItem(operation.item!);

    const result = await makeHttpRequest<OperationDTO_Get, OperationDTO_Post>({
        path: `/operations/${operation.type.toString()}s/${operation.id}`,
        method: "put",
        body: {
            date: operation.date,
            itemId: itemId,
            sum: operation.sum
        }
    });

    if (result.ok && result.body) {
        return mapOperationDTO(result.body);
    }
    else {
        return null;
    }
}

export const deleteOperation = async (operationId: number): Promise<boolean> => {
    const result = await makeHttpRequest<boolean>({
        path: `/operations/${operationId}`,
        method: "delete"
    });

    if (result.ok) {
        return true;
    }
    else {
        return false;
    }
}

const ensureItem = async (item: Item): Promise<number> => {
    let itemId = item.id;

    if (itemId === 0) {
        const dbItem = await postItem(item);
        if (dbItem === null)
            throw new Error("Item is null");
        itemId = dbItem.id;
    }

    return itemId;
}
