import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dayElem: document.querySelector('[data-days]'),
  hoursElem: document.querySelector('[data-hours]'),
  minutesElem: document.querySelector('[data-minutes]'),
  secondsElem: document.querySelector('[data-seconds]'),
};

let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }
    refs.startBtn.disabled = false;
    userDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function onStartBtnClick(e) {
  timerId = setInterval(() => {
    const diff = userDate - Date.now();
    if (diff < 1000) {
      clearInterval(timerId);
    }
    const date = convertMs(diff);
    renderTimer(date);
  }, 1000);
  refs.startBtn.disabled = true;
}

refs.startBtn.addEventListener('click', onStartBtnClick);

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

function renderTimer({ days, hours, minutes, seconds }) {
  refs.dayElem.textContent = addLeadingZero(days);
  refs.hoursElem.textContent = addLeadingZero(hours);
  refs.minutesElem.textContent = addLeadingZero(minutes);
  refs.secondsElem.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}
