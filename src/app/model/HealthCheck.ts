export class HealthCheck {
  static readonly INFECTED = 1;
  static readonly NOT_INFECTED = 2;
  static readonly SELF_ISOLATED = 3;
  static readonly CURED = 4;
  static readonly NOT_DETERMINED = 5;

  static displayName(code: number): string {
    if (code === HealthCheck.INFECTED) {
      return 'Zaražen';
    } else if (code === HealthCheck.NOT_INFECTED) {
      return 'Nezaražen';
    } else if (code === HealthCheck.SELF_ISOLATED) {
      return 'Samoizolacija';
    } else if (code === HealthCheck.CURED) {
      return 'Izliječen';
    } else if (code === HealthCheck.NOT_DETERMINED) {
      return 'Neodređeno';
    }
  }

  static getMark(code: number): string {
    if (code === HealthCheck.INFECTED) {
      return 'Z';
    } else if (code === HealthCheck.NOT_INFECTED) {
      return 'N';
    } else if (code === HealthCheck.SELF_ISOLATED) {
      return 'S';
    } else if (code === HealthCheck.CURED) {
      return 'I';
    } else if (code === HealthCheck.NOT_DETERMINED) {
      return 'O';
    }
  }

  static getCode(mark: string): number {
    if (mark === 'Z') {
      return HealthCheck.INFECTED;
    } else if (mark === 'N') {
      return HealthCheck.NOT_INFECTED;
    } else if (mark === 'S') {
      return HealthCheck.SELF_ISOLATED;
    } else if (mark === 'I') {
      return HealthCheck.CURED;
    } else if (mark === 'O') {
      return HealthCheck.NOT_DETERMINED;
    }
  }
}
