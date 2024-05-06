import client, { Channel, Connection } from "amqplib";
import getConfig from "../utils/config";

export async function createQuesueConnection(): Promise<Channel | undefined> {
  try {
    const congig = getConfig(process.env.NODE_ENV);
    const connection: Connection = await client.connect(`${congig.rabbitMQ}`);
    const channel: Channel = await connection.createChannel();
    closeConnection(channel, connection);
  } catch (error) {
    return undefined;
  }
}

export async function closeConnection(
  channel: Channel,
  connection: Connection
): Promise<void> {
  process.once("SIGINT", async () => {
    await channel.close();
    await connection.close();
  });
}
