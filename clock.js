const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('h1');

function getTime() {
  const date = new Date();
  const minute = date.getMinutes();
  const hour = date.getHours();

  clockTitle.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }`;
}
function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
