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
        path: `/items/${type}s`
    });
    
    if (result.ok && result.body) {
        let collection = result.body;
        collection.sort((i1, i2) => {
            if (i1.name > i2.name)
                return 1;
            if (i1.name < i2.name)
                return -1;
            return 0;
        })
        return collection;
    } else {
        return [];
    }
}

export const postItem = async (item: Item): Promise<Item | null> => {
    const result = await makeHttpRequest<ItemDTO_Get, ItemDTO_Post>({
        path: `/items/${item.type.toString()}s`,
        method: "post",
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
