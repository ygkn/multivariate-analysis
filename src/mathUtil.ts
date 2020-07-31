export const sum = (array: number[]): number => array.reduce((p, c) => p + c);

export const ave = (array: number[]): number => sum(array) / array.length;

export const determinant = ([firstRow, ...restRows]: number[][]) =>
  firstRow === undefined
    ? 1
    : sum(
        firstRow.map(
          (element, columIndex): number =>
            (-1) ** columIndex *
            element *
            determinant(
              restRows.map((row) => [
                ...row.slice(0, columIndex),
                ...row.slice(columIndex + 1),
              ])
            )
        )
      );

export const solveSimultaneousEquation = (
  coefficients: number[][],
  rightSides: number[]
): number[] =>
  coefficients.map(
    (_, solutionIndex) =>
      determinant([
        ...coefficients.slice(0, solutionIndex),
        [...rightSides],
        ...coefficients.slice(solutionIndex + 1),
      ]) / determinant(coefficients)
  );

export const covarianceOf = (x: number[], y: number[]) =>
  sum(x.map((_, i) => (x[i] - ave(x)) * (y[i] - ave(y)))) / x.length - 1;

export const varianceOf = (x: number[]): number => covarianceOf(x, x);
