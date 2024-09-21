import { Channel } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { createConnection } from './connection';
import { channel as appChannel } from "../app"

const getUserPublisher = async(user: any) => {
    let channel: Channel = appChannel;
    if (!channel) channel = await createConnection() as Channel;
     // Publish user info to RabbitMQ
     const exchangeName = 'auth.user.direct.exchange';
     const routingKey = 'user.auth.check';
    const replyQueue = await channel.assertQueue('', { exclusive: true });
    const correlationId = uuidv4();

    return new Promise<string>((resolve, reject) => {
        channel.consume(replyQueue.queue, (message) => {
          if (message && message.properties.correlationId === correlationId) {
            const response = message.content.toString();
            resolve(response);
          }
        }, { noAck: true });

        const userPayload = JSON.stringify(user);
        console.log(`Publishing message: ${userPayload} to exchange: ${exchangeName} with routing key: ${routingKey} and correlation ID: ${correlationId}`);
        channel.publish(exchangeName, routingKey, Buffer.from(userPayload), {
          replyTo: replyQueue.queue,
          correlationId,
        });
      });
}

export { getUserPublisher };