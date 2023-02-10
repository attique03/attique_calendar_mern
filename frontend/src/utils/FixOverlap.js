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

function fixOverLap() {
  const createdEvents = document.querySelectorAll(".event-content");

  for (let i = 0; i < createdEvents.length - 1; i++) {
    if (elementsOverlap(createdEvents[i], createdEvents[i + 1])) {
      let margin = 50 + 200 * (i + 1);
      createdEvents[i + 1].style.marginLeft = `${margin}px`;
    }
  }
}

export default fixOverLap;
