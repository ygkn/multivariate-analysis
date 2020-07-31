import {
  ave, // 配列の平均
  covarianceOf, // 配列の共分散
  solveSimultaneousEquation, // 連立方程式を解く
  sum, // 配列の合計
  varianceOf, // 配列の分散
} from "./mathUtil";

/**
 *
 * @param explanatoryVariableLists 説明変数ごとの各行の値の配列
 * @param objectiveVariableList 目的変数に配列
 *
 * @returns 回帰係数の配列
 */
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

/**
 *
 * @param explanatoryVariableLists 説明変数ごとの各行の値の配列
 * @param objectiveVariableList 目的変数に配列
 * @param coefficients 回帰係数の配列
 *
 * @returns 回帰式の定数項
 */
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

/**
 *
 * @param explanatoryVariablesList 各行ごとの説明変数の配列
 * @param coefficients 回帰係数の配列
 * @param constant 回帰式の定数項
 *
 * @returns 予測値の配列
 */
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

/**
 *
 * @param measured 実測値
 * @param predicted 予測値
 */
export const coefficientOfDetermination = (
  measured: number[],
  predicted: number[]
): number => varianceOf(predicted) / varianceOf(measured);
