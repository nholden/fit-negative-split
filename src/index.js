const EasyFit = require('easy-fit').default;
const easyFit = new EasyFit({
  force: true,
  speedUnit: 'mph',
  lengthUnit: 'mi',
  temperatureUnit: 'fahrenheit',
  elapsedRecordField: true,
  mode: 'list',
});
const fileUploadInput = document.getElementById("js-file-upload-input");

fileUploadInput.addEventListener("change", function(event) {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onloadend = function() {
    easyFit.parse(this.result, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.stringify(data));
      }
    });
  }

  reader.readAsArrayBuffer(file);
});
