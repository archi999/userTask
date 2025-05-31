const redis = require('redis');

const subscriber = redis.createClient({
  url: process.env.REDIS_URL,
});

async function start() {
  await subscriber.connect();

  await subscriber.subscribe('task_notifications', (message) => {
    const notification = JSON.parse(message);
    console.log(`Notification: User ${notification.userId}, Task "${notification.taskTitle}" (${notification.taskId}) was ${notification.action}`);
  });

  console.log('Notification service subscribed to task_notifications channel');
}

start().catch(console.error);
