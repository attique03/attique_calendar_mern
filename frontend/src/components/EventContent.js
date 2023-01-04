import React from 'react'

const EventContent = ({ eventId }) => {
  return (
    <div className='event-content' id={`${eventId}`}>

    </div>
  )
}

// function eventContent(startTime, name, location, eventId) {
//     const eventDiv = document.createElement("div");
//     eventDiv.classList.add("event-content");
//     eventDiv.id = eventId;
  
//     const eventTime = document.createElement("span");
//     eventTime.classList.add("all-day");
//     eventTime.textContent = convertToActualTime(startTime);
  
//     const eventName = document.createElement("b");
//     eventName.classList.add("sample-item");
//     eventName.textContent = name;
  
//     const eventLocation = document.createElement("span");
//     eventLocation.classList.add("sample-location");
//     eventLocation.textContent = location;
//     eventLocation.style.marginLeft = "0px";
  
//     const eventFlex = document.querySelector(".event");
//     const eventDivData = eventFlex.appendChild(eventDiv);
//     eventDivData.appendChild(eventTime);
//     eventDivData.appendChild(eventName);
//     eventDivData.appendChild(eventLocation);
  
//     return eventDiv;
//   }



export default EventContent