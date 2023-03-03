export class Axis {
    constructor(label) {
        this.id = self.crypto.randomUUID();
        this.label = label;
        this.color = "#000000";
        this.stakes = [];
    }
}