export const calculateTimePassed = (then) => {
  const now = new Date();
  const diffInMs = now - then;

  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  let timePassedString = "";
  if (days > 0) {
    timePassedString += `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) {
      timePassedString += `, ${hours} hour${hours > 1 ? "s" : ""}`;
    }
  } else if (hours > 0) {
    timePassedString += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) {
      timePassedString += `, ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  } else {
    timePassedString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    if (seconds > 0) {
      timePassedString += `, ${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }

  return timePassedString;
};

export const displayTime = (time) => {
  const timestamp = new Date(time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat("vi-VN", options);
  const formattedDate = formatter.format(timestamp);

  return formattedDate;
};
