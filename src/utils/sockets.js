export function getStock(socket) {
  socket.emit("STOCKS");
  socket.once("STOCKS", (data) => {
    console.log(data);
  });
}

export function getExchange(socket) {
  socket.emit("EXCHANGES");
  socket.once("EXCHANGES", (data) => {
    console.log(data);
  });
}
