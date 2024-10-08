import "dotenv/config";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log('The public key from environment is', keypair.publicKey.toBase58());

console.log('The private key from environment is', keypair.secretKey);
