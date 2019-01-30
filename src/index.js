import _ from 'lodash';
import Activity from './modules/activity';
import Seconds from './modules/seconds';

const EasyFit = require('easy-fit').default;

const easyFit = new EasyFit({
  force: true,
  speedUnit: 'mph',
  lengthUnit: 'mi',
  temperatureUnit: 'fahrenheit',
  elapsedRecordField: true,
  mode: 'list',
});
const fileUploadTarget = document.getElementById('js-file-upload-target');
const summaryOutputDiv = document.getElementById('js-summary-output');
const dataOutputDiv = document.getElementById('js-data-output');

function processFile(file) {
  const reader = new FileReader();

  reader.onloadend = (loadEvent) => {
    easyFit.parse(loadEvent.target.result, (error, data) => {
      if (error) {
        throw error;
      } else {
        const activity = new Activity(data);

        if (activity.isNegativeSplit) {
          summaryOutputDiv.innerHTML = `
            Yes! You ran a ${(activity.halfSplitDifferenceFormattedTime)} negative split.<br>
          `;
        } else if (activity.isEvenSplit) {
          summaryOutputDiv.innerHTML = 'No. You ran even splits.<br>';
        } else {
          summaryOutputDiv.innerHTML = `
            No. You ran a ${activity.halfSplitDifferenceFormattedTime} positive split.<br>
          `;
        }

        dataOutputDiv.innerHTML = `
          First half: ${new Seconds(activity.firstHalfSplit.seconds).formattedTime} (${_.round(activity.firstHalfSplit.distance, 2)} mi)<br>
          Second half: ${new Seconds(activity.secondHalfSplit.seconds).formattedTime} (${_.round(activity.secondHalfSplit.distance, 2)} mi)
        `;

        summaryOutputDiv.classList.remove('hidden');
        dataOutputDiv.classList.remove('hidden');
      }
    });
  };

  reader.readAsArrayBuffer(file);
}

fileUploadTarget.addEventListener('dragenter', (dragenterEvent) => {
  dragenterEvent.stopPropagation();
  dragenterEvent.preventDefault();
});

fileUploadTarget.addEventListener('dragover', (dragoverEvent) => {
  dragoverEvent.stopPropagation();
  dragoverEvent.preventDefault();
});

fileUploadTarget.addEventListener('drop', (dropEvent) => {
  dropEvent.stopPropagation();
  dropEvent.preventDefault();
  processFile(dropEvent.dataTransfer.files[0]);
});
