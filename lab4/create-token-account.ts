import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl, } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("Account loaded: ", user.publicKey.toBase58());

const tokenMint = new PublicKey("BYeg5ADqBa6gkjLBP18sK4mPjsfR2DA3X5yTRRVrUfs4");
const destPubKey = new PublicKey("5JwW4uYcpMues4RjzCf6wLcrj8PTD6bQcn6MBWXQ4GTE");

const destTokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMint, destPubKey);

console.log("Token account created: ", destTokenAccount.address.toBase58());