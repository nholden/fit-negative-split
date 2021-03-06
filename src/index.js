import FitFile from './modules/fit_file';

const fileUploadTarget = document.getElementById('js-file-upload-target');
const fileUploadInput = document.getElementById('js-file-upload-input');
const summaryOutputDiv = document.getElementById('js-summary-output');
const dataOutputDiv = document.getElementById('js-data-output');

function updateResults(activity) {
  if (activity.isNegativeSplit) {
    summaryOutputDiv.innerHTML = `
      Yes! You had a ${(activity.halfSplitDifferenceFormattedTime)} negative split.<br>
    `;
  } else if (activity.isEvenSplit) {
    summaryOutputDiv.innerHTML = 'No. You had even splits.<br>';
  } else {
    summaryOutputDiv.innerHTML = `
      No. You had a ${activity.halfSplitDifferenceFormattedTime} positive split.<br>
    `;
  }

  dataOutputDiv.innerHTML = `
    First half: ${activity.firstHalfSplitFormattedTime}
    (${activity.firstHalfSplitFormattedDistance})<br>
    Second half: ${activity.secondHalfSplitFormattedTime}
    (${activity.secondHalfSplitFormattedDistance})
  `;

  summaryOutputDiv.classList.remove('hidden');
  dataOutputDiv.classList.remove('hidden');
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
  new FitFile(dropEvent.dataTransfer.files[0]).fetchActivity(updateResults);
});

fileUploadTarget.addEventListener('click', (clickEvent) => {
  clickEvent.stopPropagation();
  clickEvent.preventDefault();
  fileUploadInput.click();
});

fileUploadInput.addEventListener('change', (changeEvent) => {
  new FitFile(changeEvent.target.files[0]).fetchActivity(updateResults);
});
