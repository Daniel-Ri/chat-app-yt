import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  MONGO_DB_URI: str(), // Define required environment variable
});

// Export the validated environment variables
export default env;
