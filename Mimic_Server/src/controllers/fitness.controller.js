import admin from "firebase-admin";
import { FitnessData } from "../models/fitness.model";
import moment from "moment";
import fs from "fs";
import { sendNotification } from "../utils/sendNotfications";

// Load Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("./firebaseServiceKey.json"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Store user tokens for notifications
const users = {};

// Alert thresholds
const ALERT_THRESHOLDS = {
  heartRate: 110,
  gamingTime: 100,
  socialMediaTime: 90,
  productivityTime: 30,
  sleepTime: 5,
  bloodOxygen: 94,
  temperature: 37.5,
};

// Generate random fitness data
const generateFitnessData = () => ({
  heartRate: Math.floor(Math.random() * (120 - 60 + 1)) + 60,
  steps: Math.floor(Math.random() * 1000) + 4000,
  caloriesBurned: Math.floor(Math.random() * 200) + 200,
  sleep: parseFloat((Math.random() * 3 + 5).toFixed(1)),
  bloodOxygen: Math.floor(Math.random() * (100 - 92 + 1)) + 92,
  temperature: parseFloat((Math.random() * 1.5 + 36.5).toFixed(1)),
});

// Generate random app usage data
const generateAppUsageData = () => ({
  socialMedia: Math.floor(Math.random() * 60) + 30,
  gaming: Math.floor(Math.random() * 120),
  productivity: Math.floor(Math.random() * 180),
  entertainment: Math.floor(Math.random() * 90),
});

// Store or update daily data with peak values
const updateDailyData = async (userId, userToken) => {
  const currentDate = moment().format("YYYY-MM-DD");

  // Generate new data
  const newFitnessData = generateFitnessData();
  const newAppUsageData = generateAppUsageData();

  let fitnessRecord = await FitnessData.findOne({ userId, date: currentDate });

  if (!fitnessRecord) {
    fitnessRecord = new FitnessData({
      userId,
      date: currentDate,
      ...newFitnessData,
      appUsage: newAppUsageData,
    });
  } else {
    // Update fitness peaks
    fitnessRecord.heartRate = Math.max(
      fitnessRecord.heartRate,
      newFitnessData.heartRate
    );
    fitnessRecord.steps = Math.max(fitnessRecord.steps, newFitnessData.steps);
    fitnessRecord.caloriesBurned = Math.max(
      fitnessRecord.caloriesBurned,
      newFitnessData.caloriesBurned
    );
    fitnessRecord.sleep = Math.max(fitnessRecord.sleep, newFitnessData.sleep);
    fitnessRecord.bloodOxygen = Math.min(
      fitnessRecord.bloodOxygen,
      newFitnessData.bloodOxygen
    );
    fitnessRecord.temperature = Math.max(
      fitnessRecord.temperature,
      newFitnessData.temperature
    );

    // Update app usage peaks
    fitnessRecord.appUsage.socialMedia = Math.max(
      fitnessRecord.appUsage.socialMedia,
      newAppUsageData.socialMedia
    );
    fitnessRecord.appUsage.gaming = Math.max(
      fitnessRecord.appUsage.gaming,
      newAppUsageData.gaming
    );
    fitnessRecord.appUsage.productivity = Math.max(
      fitnessRecord.appUsage.productivity,
      newAppUsageData.productivity
    );
    fitnessRecord.appUsage.entertainment = Math.max(
      fitnessRecord.appUsage.entertainment,
      newAppUsageData.entertainment
    );
  }

  await fitnessRecord.save();

  // Send alerts if thresholds are exceeded
  await checkAndSendAlerts(userToken, newFitnessData, newAppUsageData);
};

// Check data against thresholds and send notifications
const checkAndSendAlerts = async (userToken, fitness, appUsage) => {
  if (fitness.heartRate > ALERT_THRESHOLDS.heartRate) {
    await sendNotification(
      userToken,
      "⚠️ High Heart Rate Alert!",
      `Your heart rate is ${fitness.heartRate} BPM. Take a break!`
    );
  }
  if (fitness.bloodOxygen < ALERT_THRESHOLDS.bloodOxygen) {
    await sendNotification(
      userToken,
      "🫁 Low Oxygen Alert!",
      `Your SpO2 is at ${fitness.bloodOxygen}%. Consider resting.`
    );
  }
  if (fitness.sleep < ALERT_THRESHOLDS.sleepTime) {
    await sendNotification(
      userToken,
      "🌙 Lack of Sleep Alert!",
      `You've slept only ${fitness.sleep} hours. Get some rest!`
    );
  }
  if (fitness.temperature > ALERT_THRESHOLDS.temperature) {
    await sendNotification(
      userToken,
      "🌡️ Fever Alert!",
      `Your temperature is ${fitness.temperature}°C. Monitor your health!`
    );
  }
  if (appUsage.gaming > ALERT_THRESHOLDS.gamingTime) {
    await sendNotification(
      userToken,
      "🎮 Gaming Overload!",
      `You've played for ${appUsage.gaming} minutes today. Take a break!`
    );
  }
  if (appUsage.socialMedia > ALERT_THRESHOLDS.socialMediaTime) {
    await sendNotification(
      userToken,
      "📱 Social Media Overuse!",
      `You've been on social media for ${appUsage.socialMedia} minutes today!`
    );
  }
  if (appUsage.productivity < ALERT_THRESHOLDS.productivityTime) {
    await sendNotification(
      userToken,
      "📉 Low Productivity Alert!",
      `You've only spent ${appUsage.productivity} minutes on productive tasks today.`
    );
  }
};

// Run data generation every 30 minutes
setInterval(() => {
  Object.entries(users).forEach(([userId, token]) => {
    updateDailyData(userId, token);
  });
}, 30 * 60 * 1000); // Every 30 minutes

export default updateDailyData;
