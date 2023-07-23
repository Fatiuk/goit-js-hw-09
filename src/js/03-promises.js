// Additional import alert
import Notiflix from 'notiflix';

const promiseGeneratorForm = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseGenerator(delay, step, amount, position) {
  for (position; position < amount; position += 1) {
    createPromise(position + 1, delay + position * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

promiseGeneratorForm.addEventListener('submit', event => {
  event.preventDefault();

  let delay = parseInt(promiseGeneratorForm.elements.delay.value);
  const step = parseInt(promiseGeneratorForm.elements.step.value);
  const amount = parseInt(promiseGeneratorForm.elements.amount.value);
  let position = 0;

  if (delay < 0 && step < 0 && amount < 0) {
    Notiflix.Notify.warning('⚠️ The form should contain only positive values');
  } else onPromiseGenerator(delay, step, amount, position);
});
