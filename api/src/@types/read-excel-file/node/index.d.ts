declare module "read-excel-file/node" {
  import { PathLike } from "fs";
  import { Stream } from "stream";

  import {
    ParseWithSchemaOptions,
    ParseWithMapOptions,
    ParseWithoutSchemaOptions,
    ParsedObjectsResult,
    Row,
  } from "../types.d.ts";

  export function parseExcelDate(excelSerialDate: number): typeof Date;

  export type Input = Stream | PathLike;

  function readXlsxFile(
    input: Input,
    options: ParseWithSchemaOptions
  ): Promise<ParsedObjectsResult>;
  function readXlsxFile(
    input: Input,
    options: ParseWithMapOptions
  ): Promise<ParsedObjectsResult>;
  function readXlsxFile(
    input: Input,
    options?: ParseWithoutSchemaOptions
  ): Promise<Row[]>;

  export default readXlsxFile;
}
