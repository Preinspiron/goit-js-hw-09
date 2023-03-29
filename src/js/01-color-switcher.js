let timerId;
const TIMER_DELAY = 1000;
const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
refs.btnStart.addEventListener('click', e => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, TIMER_DELAY);

  e.currentTarget.toggleAttribute('disabled');
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  refs.btnStart.toggleAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

///Как вынести timerId не глоб область, а в функцию ?

console.log(getRandomHexColor());
