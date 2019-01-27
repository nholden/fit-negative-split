import _ from 'lodash';

export default class Seconds {
  constructor(seconds) {
    if (!Number.isInteger(seconds) || seconds < 0) {
      throw new TypeError('seconds must be a positive integer');
    }

    this.seconds = seconds;
  }

  get formattedTime() {
    const timeHours = Math.floor(this.seconds / 3600);
    const timeMinutes = Math.floor((this.seconds - (timeHours * 3600)) / 60);
    const timeSeconds = this.seconds - (timeHours * 3600) - (timeMinutes * 60);

    const mm = _.padStart(timeMinutes, 2, '0');
    const ss = _.padStart(timeSeconds, 2, '0');

    return timeHours > 0 ? `${timeHours}:${mm}:${ss}` : `${timeMinutes}:${ss}`;
  }
}
