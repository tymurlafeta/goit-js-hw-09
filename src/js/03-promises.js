import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function onFormSubmit(e) {
  e.preventDefault();
  const delay = +e.target.elements.delay.value;
  const step = +e.target.elements.step.value;
  const amount = +e.target.elements.amount.value;
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + i * step)
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

refs.formEl.addEventListener('submit', onFormSubmit);
