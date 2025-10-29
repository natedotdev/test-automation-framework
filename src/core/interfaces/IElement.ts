export interface IElement {
  click(): Promise<void>;
  type(text: string): Promise<void>;
  getText(): Promise<string>;
  isVisible(): Promise<boolean>;
}
