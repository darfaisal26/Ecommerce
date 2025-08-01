const User = require("../src/models/user.model");
const connectDb = require("../src/config/db");

async function runMigration() {
  await connectDb();

  const result = await User.updateMany(
    { isActive: { $exists: false } },
    { $set: { isActive: true } }
  );

  console.log(`${result.modifiedCount} users updated`);
}

runMigration();
