function convertToActualTime(time) {
  return time === 9
    ? 1
    : time === 10
    ? 3
    : time === 11
    ? 5
    : time === 12
    ? 7
    : time === 13
    ? 9
    : time === 14
    ? 11
    : time === 15
    ? 13
    : time === 16
    ? 15
    : time === 17
    ? 17
    : time === 18
    ? 19
    : time === 19
    ? 21
    : time === 20
    ? 23
    : "Wrong time";
}

export default convertToActualTime;
