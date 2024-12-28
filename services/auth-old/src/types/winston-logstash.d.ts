// src/types/winston-logstash.d.ts
declare module 'winston-logstash' {
    import * as winston from 'winston';
  
    interface LogstashTransportOptions {
      host: string;
      port: number;
      max_connect_retries?: number;
      timeout?: number;
    }
  
    class LogstashTransport extends winston.TransportStreamOptions {
      constructor(options: LogstashTransportOptions);
    }
  
    export { LogstashTransport };
  }