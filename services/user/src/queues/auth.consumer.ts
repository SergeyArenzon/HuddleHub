import { Channel, ConsumeMessage } from 'amqplib';
import { PrismaClient } from '@prisma/client';


const consumeAuthMessage = async (channel: Channel) => {
  try {
    const queueName = 'user.auth.check.queue';
    const exchangeName = 'auth.user.direct.exchange';
    const routingKey = 'user.auth.check';
    await channel.assertExchange(exchangeName, 'direct');
    const queue = await channel.assertQueue(queueName, { durable: false });
    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    channel.consume(queue.queue, async (message: ConsumeMessage | null) => {
      if (message) {
        const authUser: {
          d: string
          email: string
          name: string
          given_name: string
          family_name: string
          picture: string
        } = JSON.parse(message.content.toString());
        const correlationId = message.properties.correlationId;
        const replyTo = message.properties.replyTo;
        const prisma = new PrismaClient();
        let user = await prisma.user.findUnique({select: {email: true}, where: {email: authUser.email}});
        if (!user) {
          user = await prisma.user.create({data: {
            email: authUser.email,
            first_name: authUser.given_name,
            last_name: authUser.family_name,
            image_url: authUser.picture,
          }});
        }
        
        if (replyTo) {
          channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(user)), {
            correlationId,
          });
        }

        channel.ack(message);
      }
    });
  } catch (error) {
    console.error('Error consuming message:', error);
  }
};

export { consumeAuthMessage };
