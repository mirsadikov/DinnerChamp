class Socket {
  init(io) {
    this.io = io;
    this.listen();
  }

  // events
  listen() {
    this.io.on('connection', (socket) => {
      console.log('New socket'.bgYellow);

      socket.on('disconnect', () => console.log('Socket disconnected'.bgRed));
    });
  }

  emit(event, data) {
    this.io.emit(event, data);
  }
}

const socket = new Socket();

export default socket;
