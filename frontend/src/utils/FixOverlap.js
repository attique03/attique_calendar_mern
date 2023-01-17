function elementsOverlap(el1, el2) {
  let domRect1 = el1.getBoundingClientRect();
  let domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

// Fix OverLap and prevent from colliding.
function fixOverLap() {
  const createdEvents = document.querySelectorAll(".event-content");

  for (let i = 0; i < createdEvents.length - 1; i++) {
    if (elementsOverlap(createdEvents[i], createdEvents[i + 1])) {
      let divWidth = 100 / createdEvents.length;
      createdEvents[i].style.width = `${divWidth}%`;
      createdEvents[i + 1].style.width = `${divWidth}%`;

      if (createdEvents.length === 2) {
        createdEvents[i + 1].style.width = null;
        createdEvents[i + 1].style.marginLeft = `${450}px`;
      } else if (createdEvents.length === 3) {
        if (i === 1) {
          createdEvents[i + 1].style.width = null;
          createdEvents[i].style.marginLeft = `${320}px`;
          createdEvents[i + 1].style.marginLeft = `${590}px`;
        }
      } else {
        createdEvents[i + 1].style.marginLeft = `${350}px`;
      }
    }
  }
}

export default fixOverLap;
