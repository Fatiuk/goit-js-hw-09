const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
// Added timeId !!!
let timerId = null;

startButton.addEventListener('click', onStartChangeBackground);

function onStartChangeBackground() {
  // Disabled button after click on 'Start' button
  startButton.disabled = true;
  // Remove eventListener on 'Start' button
  startButton.removeEventListener('click', onStartChangeBackground);
  // Added eventListener on 'Stop' button
  stopButton.addEventListener('click', onStopChangeBackground);
  // (Added) interval function which change background color
  timerId = setInterval(() => {
    body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }, 1000);
}

function onStopChangeBackground() {
  // Enabled button after click on 'Stop' button
  startButton.disabled = false;
  // Remove eventListener on 'Stop' button
  stopButton.removeEventListener('click', onStopChangeBackground);
  // Added eventListener on 'Start' button
  startButton.addEventListener('click', onStartChangeBackground);
  // (Deleted) interval function which change background color
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
}
