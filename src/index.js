import _ from 'lodash';
import FitFile from './modules/fit_file';
import Seconds from './modules/seconds';

const fileUploadTarget = document.getElementById('js-file-upload-target');
const fileUploadInput = document.getElementById('js-file-upload-input');
const fileUploadStatusSpan = document.getElementById('js-file-upload-status');
const dataOutputDiv = document.getElementById('js-data-output');
const quantityRadio = document.getElementById('js-quantity-radio');
const distanceRadio = document.getElementById('js-distance-radio');
const quantityFieldsDiv = document.getElementById('js-quantity-fields');
const distanceFieldsDiv = document.getElementById('js-distance-fields');
const quantityInput = document.getElementById('js-quantity');
const calculateButton = document.getElementById('js-calculate-button');

function updateResults() {
  if (quantityRadio.checked) {
    const tableRows = window
      .activity
      .splits({ quantity: parseInt(quantityInput.value, 10) })
      .map(split => (
        `<tr><td>${_.round(split.distance, 2)} mi</td><td>${new Seconds(split.seconds).formattedTime}</td></tr>`
      ));
    dataOutputDiv.innerHTML = `<table>
        <tr>
          <th>Distance</th>
          <th>Time</th>
        </tr>
        ${tableRows.join('')}
      </table>`;
    dataOutputDiv.classList.remove('hidden');
  }
}

function updateFileUploadCopy() {
  if (window.activity) {
    fileUploadStatusSpan.innerHTML = '✅ Got it!';
  } else {
    fileUploadStatusSpan.innerHTML = 'Drop your .FIT file';
  }
}

function enableButton() {
  calculateButton.classList.add('hover:bg-blue-300');
  calculateButton.classList.remove('opacity-50');
  calculateButton.classList.remove('cursor-not-allowed');
  calculateButton.removeAttribute('disabled');
}

function disableButton() {
  calculateButton.classList.remove('hover:bg-blue-300');
  calculateButton.classList.add('opacity-50');
  calculateButton.classList.add('cursor-not-allowed');
  calculateButton.setAttribute('disabled', 'disabled');
}

function updateButtonStatus() {
  if (window.activity) {
    enableButton();
  } else {
    disableButton();
  }
}

function updateActivity(file) {
  fileUploadStatusSpan.innerHTML = 'Uploading...';
  disableButton();
  new FitFile(file).fetchActivity((fetchedActivity) => {
    window.activity = fetchedActivity;
    setTimeout(() => {
      updateFileUploadCopy();
      updateButtonStatus();
    }, 150);
  });
}

fileUploadTarget.addEventListener('dragenter', (dragenterEvent) => {
  dragenterEvent.stopPropagation();
  dragenterEvent.preventDefault();
  dragenterEvent.target.classList.remove('bg-yellow-1000');
  dragenterEvent.target.classList.add('bg-yellow-900');
});

fileUploadTarget.addEventListener('dragleave', (dragleaveEvent) => {
  dragleaveEvent.target.classList.remove('bg-yellow-900');
  dragleaveEvent.target.classList.add('bg-yellow-1000');
});

fileUploadTarget.addEventListener('dragover', (dragoverEvent) => {
  dragoverEvent.stopPropagation();
  dragoverEvent.preventDefault();
});

fileUploadTarget.addEventListener('drop', (dropEvent) => {
  dropEvent.stopPropagation();
  dropEvent.preventDefault();
  dropEvent.target.classList.remove('bg-yellow-900');
  dropEvent.target.classList.add('bg-yellow-1000');
  updateActivity(dropEvent.dataTransfer.files[0]);
});

fileUploadTarget.addEventListener('click', (clickEvent) => {
  clickEvent.stopPropagation();
  clickEvent.preventDefault();
  fileUploadInput.click();
});

fileUploadInput.addEventListener('change', (changeEvent) => {
  updateActivity(changeEvent.target.files[0]);
});

quantityRadio.addEventListener('change', () => {
  quantityFieldsDiv.classList.remove('hidden');
  distanceFieldsDiv.classList.add('hidden');
});

distanceRadio.addEventListener('change', () => {
  distanceFieldsDiv.classList.remove('hidden');
  quantityFieldsDiv.classList.add('hidden');
});

calculateButton.addEventListener('click', () => {
  updateResults();
});
