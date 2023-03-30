import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const renderElRef = document.querySelectorAll('.timer .value');
const btnStartRef = document.querySelector('[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dataCheck(selectedDates[0])
      .then(btnStartToggle)
      .catch(err => {
        console.log(err);
        btnStartRef.setAttribute('disabled', '');
        Notify.failure('Please, choose a date in future');
      });
  },
};
flatpickr('#datetime-picker', options);

const btnStartToggle = () => btnStartRef.toggleAttribute('disabled');
btnStartToggle();

function dataCheck(date) {
  return new Promise((resolve, rejeck) => {
    const dataNow = Date.now();
    if (dataNow < Date.parse(date)) resolve('The date is correct');
    rejeck('Error: The date must be in future');
  });
}

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

function addLeadingZero({ days, hours, minutes, seconds }) {
  return {
    days: days.toString().padStart(2, 0),
    hours: hours.toString().padStart(2, 0),
    minutes: minutes.toString().padStart(2, 0),
    seconds: seconds.toString().padStart(2, 0),
  };
}

btnStartRef.addEventListener('click', handleBtnClick);

let currentDate = '';
// let inputTimeDate = '';

function handleBtnClick(e) {
  let inputTimeDate = e.currentTarget.previousElementSibling.value;

  const renderInterval = setInterval(() => {
    currentDate = Date.now();
    const countDownValue = Date.parse(inputTimeDate) - currentDate;
    const convertedValau = convertMs(countDownValue);
    const readyForRenderValue = addLeadingZero(convertedValau);

    renderElRef.forEach(el => {
      const temp = Object.keys(el.dataset)[0];
      el.textContent = readyForRenderValue[temp];
    });
  }, 1000);
  return;
}
