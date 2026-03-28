import dns from "node:dns";
import mongoose from "mongoose";

dns.setDefaultResultOrder("ipv4first");

const explainConnectionFailure = (error: unknown) => {
  const err = error as { code?: string; message?: string };
  if (err?.code === "ESERVFAIL" || err?.message?.includes("querySrv")) {
    console.error(`
DNS could not resolve MongoDB Atlas SRV records (ESERVFAIL).
Try:
  • Switch DNS to 1.1.1.1 or 8.8.8.8 (Windows: Network adapter → IPv4 DNS)
  • Disable VPN / corporate firewall blocking DNS
  • In Atlas: confirm cluster is running; connection string has correct password
  • Optional: use a non-SRV URI (mongodb://host1:27017,...) from Atlas if SRV is blocked
`);
  }
};

const connectDb = async () => {
  const uri = process.env.CONNECTION_STRING;
  if (!uri) {
    console.error("Missing CONNECTION_STRING in environment");
    process.exit(1);
  }
  try {
    const connect = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15_000,
      family: 4,
    });
    console.log(
      `MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    explainConnectionFailure(error);
    process.exit(1);
  }
};

export default connectDb;
