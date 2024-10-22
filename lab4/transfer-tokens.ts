import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { transfer } from "@solana/spl-token";

const AMOUNT = 2;
const DECIMALS = 6;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("Account loaded: ", user.publicKey.toBase58());

const destTokenAccount = new PublicKey("9j3uYxDQdgZxncwHrtroGPwo9qw9RhbBJpnhcbkNsafT");
const sourceTokenAccount = new PublicKey("9nnAE1JVnso1vBc7seXpCPT22Jw4PF3rinjyVMASYuR7");

const signature = await transfer(
  connection,
  user,
  sourceTokenAccount,
  destTokenAccount,
  user,
  AMOUNT * (10 ** DECIMALS)
);

const link = getExplorerLink("tx", signature, "devnet");

console.log("Transfered 2 tokens: ", link);