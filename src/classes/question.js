import { Answer } from "./answer";

export class Question {
    constructor(text) {
        this.question_key = self.crypto.randomUUID()
        this.ratio = 100;
        this.info = ""
        this.text = text;
        this.isShown = false;
        this.hasOpenEnd = false;
        this.options = [
            new Answer()
        ];
    }
}