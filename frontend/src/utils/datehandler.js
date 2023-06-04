import hoursMapper from "./HoursMapper";

export const setCreationDate = (time) =>
  new Date().setHours(
    Object.values(hoursMapper[time - 1])[0].split(":")[0],
    Object.values(hoursMapper[time - 1])[0].split(":")[1]
  );

export const setFormDate = (time) =>
  `${new Date(time).getHours()}:${
    new Date(time).getMinutes() === 0 ? "00" : new Date(time).getMinutes()
  }`;

export const setUpdationDate = (time) =>
  new Date().setHours(time.split(":")[0], time.split(":")[1]);

export const contentHeight = (startTime, endTime) =>
  new Date(endTime).getHours() % 2 === 0 && new Date(endTime).getMinutes() !== 0
    ? ((new Date(endTime) - new Date(startTime)) / 3600000) * 70
    : ((new Date(endTime) - new Date(startTime)) / 3600000) * 72.5;

export const contentMargin = (startTime) =>
  new Date(startTime).getMinutes() !== 0 &&
  new Date(startTime).getMinutes() % 2 === 0 &&
  30.5;
