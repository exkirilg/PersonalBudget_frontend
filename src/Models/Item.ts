import { OperationType } from "./OperationType";

export class Item {
    public id: number = 0;
    public name: string = "";
    public type: OperationType = OperationType.Income;

    public constructor (init?:Partial<Item>) {
        Object.assign(this, init);
    }
}
