export function getStock(socket) {
  console.log("STOCKS");
  socket.emit("STOCKS");
  socket.once("STOCKS", (data) => {
    return data;
  });
}

export function getExchange(socket) {
  socket.emit("EXCHANGES");
  socket.once("EXCHANGES", (data) => {
    console.log(data);
  });
}

export function getBuys(socket) {
  socket.once("BUY", (data) => {
    console.log("buy");
    console.log(data);
  });
}

export function getSells(socket) {
  socket.once("SELL", (data) => {
    console.log("sell");
    console.log(data);
  });
}
