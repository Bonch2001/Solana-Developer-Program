import "dotenv/config";
import {
  Connection, LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Connected to devnet", connection.rpcEndpoint);

const myPubkey = new PublicKey("9APNBjWPW3VNYs7zbq2FzY4bS7nEDCN9GkqSED8iarzZ");

const balanceInLamports = await connection.getBalance(myPubkey);

console.log("Current balance in lamports:", balanceInLamports);

console.log("Airdropping 1 SOL...");

await airdropIfRequired(connection, myPubkey, 1 * LAMPORTS_PER_SOL, 2 * LAMPORTS_PER_SOL);

console.log("Done! Airdropped 1 SOL");

const balanceInLamports2 = await connection.getBalance(myPubkey);

console.log("Final balance in lamports:", balanceInLamports2);
