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

// function elementsOverlap(div1, div2) {
//   var x1 = div1.offset().left;
//   var y1 = div1.offset().top;
//   var h1 = div1.outerHeight(true);
//   var w1 = div1.outerWidth(true);
//   var b1 = y1 + h1;
//   var r1 = x1 + w1;
//   var x2 = div2.offset().left;
//   var y2 = div2.offset().top;
//   var h2 = div2.outerHeight(true);
//   var w2 = div2.outerWidth(true);
//   var b2 = y2 + h2;
//   var r2 = x2 + w2;

//   if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
//   return true;
// }

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
