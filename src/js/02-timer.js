// Import from documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/themes/dark.css';
// Additional import alert
import Notiflix from 'notiflix';

const dataInput = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

// All timer values
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Additional options for flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    disableStartButton();
  },
};

// Initialization flatpickr
flatpickr(dataInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function which add leading zero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Function which render text content from convertMs
function renderTimeContent(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

// Disabled or enabled start button in the timer
startButton.disabled = true;
function disableStartButton() {
  if (Date.now() > Date.parse(`${dataInput.value}`)) {
    startButton.disabled = true;
    // Additional notifix alert (failure)
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startButton.disabled = false;
    // Additional notifix alert (success)
    Notiflix.Notify.success('Congratulations! Click "Start" to begin');
  }
}

startButton.addEventListener('click', onCountdownTimer);

// Controls the countdown timer from a specified date to now
function onCountdownTimer() {
  // Disabled start button in the timer
  startButton.disabled = true;

  // Remove start button
  startButton.classList.add('hidden');

  // Additional notifix alert (warning)
  Notiflix.Notify.warning('Press the "Reset" Button to reset the timer');

  // Added reset button
  dataInput.insertAdjacentHTML(
    'afterend',
    '<button type="button" data-reset>Reset</button>'
  );
  // querySelector for reset button
  let resetButton = document.querySelector('[data-reset]');

  // Event on reset button
  resetButton.addEventListener('click', onResetTimer);

  function onResetTimer() {
    startButton.disabled = false;
    clearInterval(tymeId);
    renderTimeContent(0, 0, 0, 0);
    // Additional notifix alert (success)
    Notiflix.Notify.success('Timer Reset Successful');
    // Remove reset button and return start button
    resetButton.remove();
    startButton.classList.remove('hidden');
    // Remove EventListener on reset button
    resetButton.removeEventListener('click', onResetTimer);
  }

  // Set interval for timer
  const tymeId = setInterval(() => {
    // Get current and input time difference in milliseconds.
    const currentTime = Date.now();
    const inputTime = Date.parse(`${dataInput.value}`);
    const differenceTime = inputTime - currentTime;

    console.log(convertMs(differenceTime));
    // Destructurization result difference time from convertMs
    const { days, hours, minutes, seconds } = convertMs(differenceTime);
    // Render time text conten from differenceTime
    renderTimeContent(days, hours, minutes, seconds);

    // Handles timer completion, reset, enabled start button and update button
    if (differenceTime <= 0) {
      startButton.disabled = false;
      clearInterval(tymeId);
      renderTimeContent(0, 0, 0, 0);
      // Remove reset button and return start button
      resetButton.remove();
      startButton.classList.remove('hidden');
    }
  }, 1000);
}
