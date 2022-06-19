import { Item } from "../Models/Item";
import { OperationType } from "../Models/OperationType";
import { makeHttpRequest } from "../Services/HttpServices";

export interface ItemDTO_Get {
    id: number,
    name: string,
    type: OperationType
}

export interface ItemDTO_Post {
    name: string
}

export const getItemsByType = async (type: OperationType): Promise<Item[]> => {
    const result = await makeHttpRequest<ItemDTO_Get[]>({
        path: `/budgetitems/${type}s`
    });
    
    if (result.ok && result.body) {
        return result.body;
    } else {
        return [];
    }
}

export const postItem = async (item: Item): Promise<Item | null> => {
    const result = await makeHttpRequest<ItemDTO_Get, ItemDTO_Post>({
        path: `/budgetitems/${item.type.toString()}s`,
        method: 'post',
        body: {
            name: item.name
        }
    })

    if (result.ok && result.body) {
        return result.body;
    }
    else {
        return null;
    }
}
