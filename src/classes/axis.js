export class Axis {
    constructor(label) {
        this.id = self.crypto.randomUUID();
        this.label = label;
        this.color = "#FFFFFF";
        this.stakes = [];
    }
}