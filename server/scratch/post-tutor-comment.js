import mongoose from "mongoose";
import User from "../src/database/models/User.js";
import LearningProgress from "../src/database/models/LearningProgress.js";
import RoadmapComment from "../src/database/models/RoadmapComment.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/skillsphere";

async function postComment() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    const tutor = await User.findOne({ email: "tutor@test.com" });
    const student = await User.findOne({ role: "student" });

    const progress = await LearningProgress.findOne({ user: student._id });
    if (!progress) {
      console.error("Roadmap not found");
      process.exit(1);
    }

    const firstMilestone = progress.roadmap[0];
    if (!firstMilestone) {
      console.error("No milestones found");
      process.exit(1);
    }

    // Create a long comment
    const comment = await RoadmapComment.create({
      roadmap: progress._id,
      milestoneId: firstMilestone._id,
      sender: tutor._id,
      content: "This is a very long response from the tutor to check if the comment bubble wraps text correctly or if it gets cut off or truncated. Let's make it extremely long so that it overflows the sidebar container if the styles are incorrect.",
      type: "comment"
    });

    console.log("Created tutor comment successfully:", comment);
    process.exit(0);
  } catch (err) {
    console.error("Error posting comment:", err);
    process.exit(1);
  }
}

postComment();
