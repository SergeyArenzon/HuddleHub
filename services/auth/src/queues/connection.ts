import client, { Channel, Connection } from 'amqplib'; 

const { RABBITMQ_URL } = process.env;

let channel: Channel | undefined;

const createConnection = async() : Promise<Channel | undefined> => {
    try {
        const connection: Connection = await client.connect(RABBITMQ_URL!);
        channel = await connection.createChannel();
        console.log('[AMQP] Auth connected');
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


