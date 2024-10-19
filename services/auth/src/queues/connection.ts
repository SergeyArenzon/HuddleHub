import client, { Channel, Connection } from 'amqplib'; 
import { config } from '../config';
import {fastify} from '../app'

let channel: Channel | undefined;

const createConnection = async() : Promise<Channel | undefined> => {
    try {
        const connection: Connection = await client.connect(config.rabbitmqUrl);
        channel = await connection.createChannel();
        console.log('[AMQP] Auth connected');
        fastify.log.info(`[AMQP] Auth connected`);

        closeConnection(channel, connection);
        return channel;
    } catch (error) {
        console.log({error});
        
        return undefined
    }
}

const closeConnection = (channel: Channel, connection: Connection) : void => {
    process.once('SIGINT', async () => {
        await channel.close();
        await connection.close();   
    });
}

export { createConnection };


