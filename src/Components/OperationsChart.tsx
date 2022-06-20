import React from "react";
import { AppState } from "../State/Store";
import { useSelector } from "react-redux";

import { PieChart } from "react-minimal-pie-chart";
import { Operation } from "../Models/Operation";
import { OperationType } from "../Models/OperationType";
import { Container } from "react-bootstrap";

interface Props {
    type: OperationType
}

type ChartData = {
    color: string;
    value: number;
    title: string;
}[];

const colorIncomesOthers = "#8bd3c7";
const colorExpensesOthers = "#fd7f6f";
const colors: string[] = ([
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5"
]);

export const Chart = ({type}: Props) => {
    
    const operations = useSelector((state: AppState) => state.operations.operations);

    const getSum = (data: Operation[]): number => {
        let result = data.reduce((a, b) => {
            a += b.sum;
            return a;
        }, 0);
        return result;
    }

    const getChartData = (type: OperationType): ChartData => {

        const operationsByType = operations.filter(o => o.type === type);
        const sum = getSum(operationsByType);

        let result: ChartData = [];

        operationsByType.forEach(operation => {
            if (result.find(element => element.title === operation.item?.name) === undefined) {
                result.push({
                    title: operation.item!.name,
                    value: Number((getSum(operationsByType.filter(o => o.item?.name === operation.item?.name)) / sum * 100).toFixed(2)),
                    color: ""
                })
            }
        });

        result.sort((e1, e2) => {
            if (e1.value > e2.value)
                return -1;

            if (e1.value < e2.value)
                return 1;

            return 0;
        });

        const minValue = 10;
        if (result.length > colors.length || result.filter(e => e.value < minValue).length > 1) {
            let othersSum = 0;
            let spliceIndex = Math.min(result.length - 1, colors.length);
            let deleteCount = 0;
            
            for (let i = colors.length; i <= result.length - 1; i++) {
                othersSum += result[i].value;
                deleteCount++;
            }

            const currentSpliceIndex = spliceIndex;

            for (let i = currentSpliceIndex; i >= 0 && result[i].value < minValue; i--) {
                if (i === currentSpliceIndex) {
                    continue;
                }
                spliceIndex = i;
                deleteCount++;
                othersSum += result[i].value;
                if (i === currentSpliceIndex - 1) {
                    othersSum += result[i + 1].value;
                    deleteCount++;
                }
            }
            result.splice(spliceIndex, deleteCount, {
                title: "Others",
                value: Number(othersSum.toFixed(2)),
                color: type === OperationType.Income ? colorIncomesOthers : colorExpensesOthers
            })
        }

        for (let i = 0; i < result.length && i < colors.length && result[i].title !== "Others"; i++) {
            result[i].color = colors[i];
        }

        return result;
    }

    return (
        <Container className="text-center">
            
            <h4 className={type === OperationType.Income ? "text-success" : "text-danger"}>
                {`${type}s`} {getSum(operations.filter(operation => operation.type === type)).toFixed(2)}
            </h4>
            
            <PieChart
                data={getChartData(type)}
                lineWidth={15}
                paddingAngle={15}
                rounded
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={(index) => ({
                    fill: getChartData(type)[index].color,
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                })}
                labelPosition={65}
                animate
                background="#e2e2e2"
            />

        </Container>
    );
}
