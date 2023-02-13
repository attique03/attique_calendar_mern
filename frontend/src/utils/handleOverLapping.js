import convertToActualTime from "./ConvertTime";

const overLappingEvents = (events) => {
  const overlappingEvents = [];

  events.sort((a, b) =>
    convertToActualTime(new Date(a.startTime).getHours()) <
    convertToActualTime(new Date(b.startTime).getHours())
      ? -1
      : 1
  );

  let tempEndTime = convertToActualTime(new Date(events[0].endTime).getHours()),
    tempOverlapped = [events[0]];
  for (let i = 1; i < events.length; i++) {
    if (
      convertToActualTime(new Date(events[i].startTime).getHours()) <
      tempEndTime
    ) {
      tempOverlapped.push(events[i]);
      tempEndTime = Math.max(
        tempEndTime,
        convertToActualTime(new Date(events[i].endTime).getHours())
      );
    } else {
      overlappingEvents.push(tempOverlapped);
      tempOverlapped = [events[i]];
      tempEndTime = convertToActualTime(new Date(events[i].endTime).getHours());
    }
  }
  overlappingEvents.push(tempOverlapped);
  return overlappingEvents;
};

export { overLappingEvents };
