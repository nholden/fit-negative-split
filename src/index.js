import _ from 'lodash';
import Activity from './activity';
import Seconds from './seconds';

const EasyFit = require('easy-fit').default;

const easyFit = new EasyFit({
  force: true,
  speedUnit: 'mph',
  lengthUnit: 'mi',
  temperatureUnit: 'fahrenheit',
  elapsedRecordField: true,
  mode: 'list',
});
const fileUploadInput = document.getElementById('js-file-upload-input');
const dataOutputDiv = document.getElementById('js-data-output');

fileUploadInput.addEventListener('change', (changeEvent) => {
  const file = changeEvent.target.files[0];
  const reader = new FileReader();

  reader.onloadend = (loadEvent) => {
    easyFit.parse(loadEvent.target.result, (error, data) => {
      if (error) {
        throw error;
      } else {
        const activity = new Activity(data);
        dataOutputDiv.innerHTML = `
          Half: ${new Seconds(activity.records.midDistanceRecord.elapsed_time).formattedTime} at ${_.round(activity.records.midDistanceRecord.distance, 2)} mi<br>
          Finish: ${new Seconds(activity.records.longestDistanceRecord.elapsed_time).formattedTime} at ${_.round(activity.records.longestDistanceRecord.distance, 2)} mi
        `;
      }
    });
  };

  reader.readAsArrayBuffer(file);
});
