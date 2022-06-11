import { Item } from "./Item"

export interface Operation {
    id: number,
    date: Date,
    type: number,
    sum: number,
    item: Item
}
