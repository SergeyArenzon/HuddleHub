declare module 'pino-socket' {
    interface PinoSocketOptions {
      mode: 'tcp' | 'udp';
      address: string;
      port: number;
    }
  
    export default function (options: PinoSocketOptions): NodeJS.WritableStream;
  }