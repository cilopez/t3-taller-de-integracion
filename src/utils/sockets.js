
export function getStock(socket){
    socket.emit('STOCKS', );
    socket.on('STOCKS', (data) => {
        console.log(data);
    });
}

export function getExchange(socket){
    socket.emit('EXCHANGES',);
    socket.on('EXCHANGES', (data) => {
        console.log(data);
    });
}