import { Answer } from "./answer";

export class SourceData {
  constructor(text) {
    this.info = "";
    this.text = text;
    this.options = [new Answer()];
  }
}
