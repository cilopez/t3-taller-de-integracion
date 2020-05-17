export function toDate(unix_timestamp) {
  var date = new Date(unix_timestamp).toLocaleTimeString("es-CL");
  return date;
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function createColors(number) {
  const colors = [];
  let i = 0;
  while (i < number) {
    colors.push(getRandomColor());
    i++;
  }
  return colors;
}

export function getTickers(data) {
  const tickers = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    Object.keys(element).forEach(function (key) {
      if (key !== "time" && !tickers.includes(key)) {
        tickers.push(key);
      }
    });
  }
  return tickers;
}
