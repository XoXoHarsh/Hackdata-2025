import admin from "firebase-admin";

export const sendNotification = async (token, title, body) => {
  const message = { notification: { title, body }, token };
  try {
    await admin.messaging().send(message);
    console.log(`Notification sent: ${title}`);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
