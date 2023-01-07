let events = [];

for (let i = 0; i < 24; i++) {
  events[i] = document.querySelector(`#event-${i + 1}`);
}

export default events;