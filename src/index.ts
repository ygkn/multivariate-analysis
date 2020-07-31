import { loadCSV } from "./CSVUtil";
import {
  getCoefficients,
  predicted,
  coefficientOfDetermination,
  getConstant,
} from "./MRA";
import { constants } from "buffer";

(async () => {
  const data = await loadCSV("./data-a.csv");

  const explanatoryVariableLists = [
    "保育所等数",
    // "失業者率",
    "婚姻率（人口千人当たり）",
    "高齢化比率",
  ].map((key) => data.map((row) => row[key]).map((value) => parseFloat(value)));

  const objectiveVariableList = data.map((row) =>
    parseFloat(row["子供(~15歳)の割合"])
  );

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
  console.log(constant);

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
