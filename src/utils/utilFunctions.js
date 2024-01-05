import dayjs from "dayjs";

export function formatTimeOutput(givenTime) {
  const currentTime = dayjs();
  const givenDate = dayjs(givenTime);

  if (givenDate.isSame(currentTime, "day")) {
    const formattedTime = givenDate.format("hh:mm A");
    return formattedTime;
  } else if (givenDate.isSame(currentTime.subtract(1, "day"), "day")) {
    return "Yesterday";
  } else if (givenDate.isAfter(currentTime.subtract(7, "day"))) {
    const dayName = givenDate.format("dddd");
    return dayName;
  } else {
    const formattedDate = givenDate.format("DD/MM/YYYY");
    return formattedDate;
  }
}

export function convertSecondsToHMS(givenTime) {
  const hours = Math.floor(givenTime / 3600);
  const minutes = Math.floor((givenTime % 3600) / 60);
  const seconds = givenTime % 60;

  let formattedTime = "";
  if (hours > 0) formattedTime += `${hours}h `;
  if (minutes > 0) formattedTime += `${minutes}m `;
  formattedTime += `${seconds}s`;

  return formattedTime;
}
