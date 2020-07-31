import {
  solveSimultaneousEquation,
  covarianceOf,
  sum,
  varianceOf,
  ave,
} from "./mathUtil";
import { constants } from "buffer";

export const getCoefficients = (
  explanatoryVariableLists: number[][],
  objectiveVariableList: number[]
): number[] =>
  solveSimultaneousEquation(
    explanatoryVariableLists.map((a) =>
      explanatoryVariableLists.map((b) => covarianceOf(a, b))
    ),
    explanatoryVariableLists.map((x) => covarianceOf(x, objectiveVariableList))
  );

export const getConstant = (
  explanatoryVariableLists: number[][],
  objectiveVariableList: number[],
  coefficients: number[]
) =>
  ave(objectiveVariableList) -
  sum(
    coefficients.map(
      (coefficient, index) => coefficient * ave(explanatoryVariableLists[index])
    )
  );

export const predicted = (
  explanatoryVariablesList: number[][],
  coefficients: number[],
  constant: number
): number[] =>
  explanatoryVariablesList.map(
    (variables) =>
      constant +
      sum(variables.map((variable, index) => variable * coefficients[index]))
  );

export const coefficientOfDetermination = (
  measured: number[],
  predicted: number[]
): number => varianceOf(predicted) / varianceOf(measured);
