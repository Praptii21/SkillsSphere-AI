/* eslint-disable no-console */
import mongoose from "mongoose";
import connectDB from "./src/database/db.js";
import User from "./src/database/models/User.js";

async function run() {
  await connectDB();
  const users = await User.find({}, 'email role name');
  console.log("Users in DB:");
  users.forEach(u => console.log(`- Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`));
  process.exit(0);
}
run();
