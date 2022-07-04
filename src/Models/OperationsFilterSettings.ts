import { getCurrentMonthBeginning, getCurrentMonthEnd } from "../Services/DateTimeServices";

export class OperationsFilterSettings {
    public dateFrom: Date = getCurrentMonthBeginning(); 
    public dateTo: Date = getCurrentMonthEnd();
    public search: string = "";

    public constructor (init?:Partial<OperationsFilterSettings>) {
        Object.assign(this, init);
    }
}
