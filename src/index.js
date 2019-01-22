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

fileUploadInput.addEventListener('change', (changeEvent) => {
  const file = changeEvent.target.files[0];
  const reader = new FileReader();

  reader.onloadend = (loadEvent) => {
    easyFit.parse(loadEvent.target.result, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.stringify(data));
      }
    });
  };

  reader.readAsArrayBuffer(file);
});
