import { logger } from '@notifications/utils/logger';
import client, { Channel, Connection } from 'amqplib';
import { consumeAuthEmailMessages } from './email-consumer';
import getConfig from '@notifications/utils/config';

export async function createQueueConnection(): Promise<Channel | undefined> {
  try {
    // Create Connection to RabbitMQ
    const connection: Connection = await client.connect(
      `${getConfig().rabbitMQ}`
    );

    const channel: Channel = await connection.createChannel();

    logger.info('Nofiication server connected to queue successfully....');
    closeQueueConnection();
    return channel;
  } catch (error) {
    console.log('Error from notification', error);
    logger.error(
      `NotificationService createConnection() method error: ${error}`
    );
    return undefined;
  }
}

function closeQueueConnection() {
  process.once(
    'SIGINT',
    async (channel: Channel, connection: Connection): Promise<void> => {
      await channel.close();
      await connection.close();
    }
  );
}

export async function startQueue(): Promise<void> {
  try {
    console.log('Hello from startqueue()');
    const emailChannel: Channel = (await createQueueConnection()) as Channel;
    await consumeAuthEmailMessages(emailChannel);
  } catch (error) {
    throw error;
  }
}
