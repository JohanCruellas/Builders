import { Answer } from "./answer";

export class Question {
    constructor(text) {
        this.ratio = 100;
        this.info = ""
        this.text = text;
        this.options = [
            new Answer()
        ];
    }
}