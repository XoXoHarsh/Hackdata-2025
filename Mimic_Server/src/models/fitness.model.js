// import mongoose, { Schema } from "mongoose";

// const fitnessDataSchema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     date: { type: String, required: true, index: true },

//     // Fitness Data
//     heartRate: { type: Number, default: 0 },
//     steps: { type: Number, default: 0 },
//     caloriesBurned: { type: Number, default: 0 },
//     sleep: { type: Number, default: 0 },
//     bloodOxygen: { type: Number, default: 100 },
//     temperature: { type: Number, default: 0 },

//     // App Usage Data
//     appUsage: {
//       socialMedia: { type: Number, default: 0 },
//       gaming: { type: Number, default: 0 },
//       // productivity: { type: Number, default: 0 },
//       entertainment: { type: Number, default: 0 },
//     },
//   },
//   { timestamps: true }
// );

// export const FitnessData = mongoose.model("FitnessData", fitnessDataSchema);
