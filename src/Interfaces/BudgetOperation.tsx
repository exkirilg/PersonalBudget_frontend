import { BudgetItem } from "./BudgetItem"

export interface BudgetOperation {
    id: number,
    date: Date,
    type: number,
    sum: number,
    item: BudgetItem
}
