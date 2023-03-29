import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormClick);

function onFormClick(e) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  let newDelay = +form.get('delay');
  let step = +form.get('step');
  for (let i = 0; i <= form.get('amount'); i += 1) {
    createPromise(i, form.get('delay'))
      .then(data =>
        Notify.success(`Fullfilled promise ${data.position} in ${data.delay}ms`)
      )
      .catch(err =>
        Notify.failure(`Rejecked promise ${err.position} in ${err.delay}ms`)
      );
    newDelay += step;
    console.log(newDelay);
    form.set('delay', newDelay);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, rejeck) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        rejeck({ position, delay });
      }
    });
  }, delay);
}
