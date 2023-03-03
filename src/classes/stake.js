export class Stake {
    constructor(label, parentId) {
        this.id = self.crypto.randomUUID();
        this.parentId = parentId;
        this.label = label;
    }
}