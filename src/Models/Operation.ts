import { OperationType } from "./OperationType";
import { Item } from "./Item";

export class Operation {
    public id: number = 0;
    public type: OperationType = OperationType.Income;
    public date: Date = new Date();
    public sum: number = 0;
    public item: Item | null = null;

    public constructor (init?:Partial<Operation>) {
        Object.assign(this, init);
    }
}
