export const timeConverter = (UNIX_timestamp: number) => {
  const date = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${day} ${month} ${year}`;
};

export const temperatureFormatter = (temp: number) => Math.round(temp);
