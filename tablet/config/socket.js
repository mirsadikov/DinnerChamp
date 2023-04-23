import io from 'socket.io-client';
import { api_url } from './variables';

class WSService {
  initializeSocket = async (token, cb) => {
    try {
      this.socket = io(api_url, {
        auth: {
          token,
        },
      });

      this.socket.on('connect', () => {
        console.log('=== socket connected ===');
        cb("Connected");
      });

      this.socket.on('disconnect', () => {
        console.log('=== socket disconnected ===');
        cb("Disconnected");
      });

      this.socket.on('error', (data) => {
        console.log('=== socket error ===', data);
        cb("Error");
      });
    } catch (error) {
      console.log('socket is not initialized', error);
    }
  };

  emit(event, ...data) {
    this.socket.emit(event, ...data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }

  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

const socketServcies = new WSService();

export default socketServcies;
