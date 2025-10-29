import { IPage } from "./IPage";

export interface IBrowser {
  newPage(): Promise<IPage>;
  close(): Promise<void>;
}