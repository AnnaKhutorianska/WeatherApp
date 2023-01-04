export const timeConverter = (UNIX_timestamp: number) => {
  const date = new Date(UNIX_timestamp * 1000);
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${hour}:${min}:${sec}`;
};

export const temperatureFormatter = (temp: number) => Math.round(temp);

export const getColorTemperature = (temp: number) => {
  if(temp === 0) return '#F5FE9C'
  if(temp > 0 && temp <= 20) return '#FFD023'
  if(temp > 20 && temp <= 40) return '#FF8307'
  if(temp > 40) return '#FF1F0E'
  if(temp < 0 && temp >= -5) return '#BAFFFF'
  if(temp < -5 && temp >= -15) return '#8CE8FF'
  if(temp < -15 && temp >= -30) return '#7CD7FF'
  if(temp < -30) return '#1576BD'
}
