export class Indicator {
    constructor( text, tooltip, type, formula, axisId, stakeId) {
      this.sourceData_key = self.crypto.randomUUID();
      this.axisId = axisId;
      this.stakeId = stakeId;
      this.tooltip = tooltip;
      this.text = text;
      this.type = type;
      this.formula = formula;
    }
  }