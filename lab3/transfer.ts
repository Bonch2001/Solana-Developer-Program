import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    Transaction,
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction,
    SystemProgram,
} from '@solana/web3.js';
import { createMemoInstruction } from '@solana/spl-memo';

const sender = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const receiver = new PublicKey("5JwW4uYcpMues4RjzCf6wLcrj8PTD6bQcn6MBWXQ4GTE");

const balance = await connection.getBalance(receiver);

console.log("Initial balance: ", balance);

const transaction = new Transaction();

const amount = 0.5;

const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: amount * LAMPORTS_PER_SOL,
});

transaction.add(transferInstruction);

const memo = "Thanks!";

const memoInstruction = createMemoInstruction(memo);

transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log("Transaction confirmed. Signature: ", signature);

const finalBalance = await connection.getBalance(receiver);

console.log("Final balance: ", finalBalance);
