import EasyFit from 'easy-fit';
import Activity from './activity';

export default class FitFile {
  constructor({ file, units }) {
    this.file = file;
    this.units = units;
  }

  fetchActivity(callback) {
    const easyFit = new EasyFit({
      force: true,
      speedUnit: 'mph',
      lengthUnit: this.units,
      temperatureUnit: 'fahrenheit',
      elapsedRecordField: true,
      mode: 'list',
    });

    const reader = new FileReader();

    reader.onloadend = (loadEvent) => {
      easyFit.parse(loadEvent.target.result, (error, data) => {
        if (error) {
          throw error;
        } else {
          callback(new Activity(data));
        }
      });
    };

    reader.readAsArrayBuffer(this.file);
  }
}
