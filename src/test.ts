import { loadCSV } from "./CSVUtil";
import {
  getCoefficients,
  predicted,
  coefficientOfDetermination,
  getConstant,
} from "./MRA";

(async () => {
  const data = await loadCSV("./data-b.csv");

  const explanatoryVariableLists = ["温度", "時間"].map((key) =>
    data.map((row) => row[key]).map((value) => parseFloat(value))
  );
  const objectiveVariableList = data.map((row) => parseFloat(row["配向度"]));

  const coefficients = getCoefficients(
    explanatoryVariableLists,
    objectiveVariableList
  );

  const constant = getConstant(
    explanatoryVariableLists,
    objectiveVariableList,
    coefficients
  );

  console.log("coefficients", coefficients);

  const explanatoryVariablesList = explanatoryVariableLists[0].map((_, index) =>
    explanatoryVariableLists.map((values) => values[index])
  );

  const predictedValues = predicted(
    explanatoryVariablesList,
    coefficients,
    constant
  );

  console.log(predictedValues);

  console.log(
    coefficientOfDetermination(objectiveVariableList, predictedValues)
  );
})();
