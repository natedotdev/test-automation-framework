import { IElement } from './IElement';

export interface IPage {
  goto(url: string): Promise<void>;
  getTitle(): Promise<string>;
  findElement(selector: string): Promise<IElement>;
  screenshot(path: string): Promise<void>;
}