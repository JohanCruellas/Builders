export class SourceData {
  constructor( text, tooltip, axisId, stakeId) {
    this.sourceData_key = self.crypto.randomUUID();
    this.axisId = axisId;
    this.stakeId = stakeId;
    this.tooltip = tooltip;
    this.text = text;
  }
}
