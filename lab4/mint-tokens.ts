import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl,  } from "@solana/web3.js";

const AMOUNT = 5;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("Account loaded: ", user.publicKey.toBase58());

const tokenMint = new PublicKey("BYeg5ADqBa6gkjLBP18sK4mPjsfR2DA3X5yTRRVrUfs4");
const destTokenAccount = new PublicKey("9j3LNhSjtCGiAqJ4Ka6xwWKpWrUhEWwoAWCT3MidTgVK");

const signature = await mintTo(
    connection,
    user,
    tokenMint,
    destTokenAccount,
    user,
    AMOUNT * (10 ** DECIMALS),
);

const link = getExplorerLink("tx", signature, "devnet");

console.log(`Minted ${AMOUNT} tokens. Link: ${link}`);