import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

if (!uri || !dbName) {
  throw new Error(
    'Please define the MONGO_URI and MONGO_DB_NAME environment variables',
  );
}

const client = new MongoClient(uri);
let clientPromise;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db(dbName);
  return { db, client };
};


// import { MongoClient, Db } from "mongodb";

// const uri: string | undefined = process.env.MONGO_URI;
// const dbName: string | undefined = process.env.MONGO_DB_NAME;

// if (!uri || !dbName) {
//   throw new Error("Please define the MONGO_URI and MONGO_DB_NAME environment variables");
// }

// const client: MongoClient = new MongoClient(uri);
// let clientPromise: Promise<MongoClient>;

// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// if (!global._mongoClientPromise) {
//   global._mongoClientPromise = client.connect();
// }
// clientPromise = global._mongoClientPromise;

// export const connectToDatabase = async (): Promise<{ db: Db; client: MongoClient }> => {
//   const client = await clientPromise;
//   const db = client.db(dbName);
//   return { db, client };
// };
