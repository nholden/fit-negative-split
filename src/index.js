import _ from 'lodash';
import FitFile from './modules/fit_file';
import Seconds from './modules/seconds';

const fileUploadTarget = document.getElementById('js-file-upload-target');
const fileUploadInput = document.getElementById('js-file-upload-input');
const fileUploadStatusSpan = document.getElementById('js-file-upload-status');
const dataOutputDiv = document.getElementById('js-data-output');
const unitsOutputSpan = document.getElementById('js-units-output');
const milesRadio = document.getElementById('js-miles-radio');
const kilometersRadio = document.getElementById('js-kilometers-radio');
const quantityRadio = document.getElementById('js-quantity-radio');
const distanceRadio = document.getElementById('js-distance-radio');
const quantityFieldsDiv = document.getElementById('js-quantity-fields');
const distanceFieldsDiv = document.getElementById('js-distance-fields');
const quantityInput = document.getElementById('js-quantity');
const distanceInput = document.getElementById('js-distance');
const calculateButton = document.getElementById('js-calculate-button');

function updateResults(activity) {
  let tableRows = [];

  if (quantityRadio.checked) {
    tableRows = activity
      .evenDistanceSplits({ quantity: parseInt(quantityInput.value, 10) })
      .map(split => (
        `<tr><td>${_.round(split.distance, 1)} ${window.units}</td><td>${new Seconds(split.seconds).formattedTime}</td></tr>`
      ));
  } else if (distanceRadio.checked) {
    tableRows = activity
      .specifiedDistanceSplits({ distance: parseInt(distanceInput.value, 10) })
      .map(split => (
        `<tr><td>${_.round(split.distance, 1)} ${window.units}</td><td>${new Seconds(split.seconds).formattedTime}</td></tr>`
      ));
  }
  dataOutputDiv.innerHTML = `<table>
      <tr>
        <th>Distance</th>
        <th>Time</th>
      </tr>
      ${tableRows.join('')}
    </table>`;
  dataOutputDiv.classList.remove('hidden');
}

function updateFileUploadCopy() {
  if (window.file) {
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
  if (window.file) {
    enableButton();
  } else {
    disableButton();
  }
}

function updateActivity(file) {
  fileUploadStatusSpan.innerHTML = 'Uploading...';
  disableButton();

  setTimeout(() => {
    window.file = file;
    updateFileUploadCopy();
    updateButtonStatus();
  }, 150);
}

function updateUnits(changeEvent) {
  window.units = changeEvent.target.value;
  unitsOutputSpan.innerHTML = changeEvent.target.value;
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

milesRadio.addEventListener('change', updateUnits);
kilometersRadio.addEventListener('change', updateUnits);

quantityRadio.addEventListener('change', () => {
  quantityFieldsDiv.classList.remove('hidden');
  distanceFieldsDiv.classList.add('hidden');
});

distanceRadio.addEventListener('change', () => {
  distanceFieldsDiv.classList.remove('hidden');
  quantityFieldsDiv.classList.add('hidden');
});

calculateButton.addEventListener('click', () => {
  new FitFile({ file: window.file, units: window.units }).fetchActivity(updateResults);
});
