export class Question {
    constructor(text, axisId, stakeId) {
        this.question_key = self.crypto.randomUUID();
        this.axisId = axisId;
        this.stakeId = stakeId;
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