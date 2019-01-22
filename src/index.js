import Activity from './activity';

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
        dataOutputDiv.innerHTML = `Distance at mid-elapsed time: ${activity.midTimeRecord.distance}`;
      }
    });
  };

  reader.readAsArrayBuffer(file);
});
