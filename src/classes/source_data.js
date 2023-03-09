export class SourceData {
  constructor( text, info, axisId, stakeId) {
    this.sourceData_key = self.crypto.randomUUID();
    this.axisId = axisId;
    this.stakeId = stakeId;
    this.info = info;
    this.text = text;
  }
}
