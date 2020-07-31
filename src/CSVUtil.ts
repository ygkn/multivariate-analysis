import { promises as fsPromise } from "fs";
import parse from "csv-parse/lib/sync";

export const loadCSV = async <
  T extends { [K in string]: string } = {
    [K in string]: string;
  }
>(
  path: string
): Promise<T[]> =>
  parse((await fsPromise.readFile(path)).toString(), { columns: true });
