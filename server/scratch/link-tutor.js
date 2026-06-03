import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/database/models/User.js";
import LearningProgress from "../src/database/models/LearningProgress.js";

dotenv.config({ path: "../.env" });

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skillsphere";

async function link() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", mongoose.connection.name);

    const allUsers = await User.find({});

    // Find the tutor in memory (handles any encryption key mismatch)
    const tutor = allUsers.find(u => u.email === "tutor@test.com" && u.role === "tutor");
    if (!tutor) {
      console.error("Tutor with email 'tutor@test.com' not found! Make sure you are logged in/registered with that email.");
      process.exit(1);
    }
    console.log(`Found Tutor: ${tutor.name} (${tutor._id})`);

    // Find the student in memory
    const student = allUsers.find(u => u.role === "student");
    if (!student) {
      console.error("No student found in database. Please log in or register a student account first so they exist in the DB.");
      process.exit(1);
    }
    console.log(`Found Student: ${student.name} (${student._id})`);

    // Find or create learning progress for student
    let progress = await LearningProgress.findOne({ user: student._id });
    if (!progress) {
      console.log("No learning roadmap found for the student. Creating a dummy one...");
      progress = new LearningProgress({
        user: student._id,
        targetRole: "Software Engineer",
        roadmap: [
          { topicName: "Data Structures & Algorithms", status: "in_progress" },
          { topicName: "System Design", status: "not_started" }
        ],
        tutorsTracking: []
      });
    }

    if (!progress.tutorsTracking.includes(tutor._id)) {
      progress.tutorsTracking.push(tutor._id);
      await progress.save();
      console.log(`Successfully linked Tutor (${tutor.name}) to Student (${student.name})'s roadmap!`);
    } else {
      console.log("Tutor is already tracking this student's roadmap.");
    }

    console.log("Linking complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error during linking:", err);
    process.exit(1);
  }
}

link();
