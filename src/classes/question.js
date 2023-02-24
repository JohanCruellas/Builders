export class Question {
    constructor(text) {
        this.question_key = self.crypto.randomUUID();
        this.type = "QCU";
        this.ratio = 100;
        this.info = "";
        this.text = text;
        this.isShown = false;
        this.hasOpenEnd = false;
        this.options = [
        ];
    }
}