export const formatNumberWithLeadingZero = number => {
  if (number < 10) {
    return '0' + number;
  } else {
    return number.toString();
  }
};
