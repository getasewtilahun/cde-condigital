declare module "read-excel-file" {
  import { PathLike } from "fs";
  import { Stream } from "stream";

  import {
    ParseWithSchemaOptions,
    ParseWithMapOptions,
    ParseWithoutSchemaOptions,
    ParsedObjectsResult,
    Row,
  } from "../types.d.ts";

  declare module "read-excel-file" {
    export default function readXlsxFile(
      input: Input,
      options?: ParseWithoutSchemaOptions
    ): Promise<Row[]>;
  }
}
