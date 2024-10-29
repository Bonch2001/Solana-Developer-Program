import { Umi } from "@metaplex-foundation/umi";
import { clusterApiUrl, Connection, PublicKey, Signer } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

export async function transferNft(umi: Umi, myKeypairSigner: Signer, mintAddress: string, toPublicKey: string) {
    try {
        const mint = new PublicKey(mintAddress);
        const recipient = new PublicKey(toPublicKey);
        const connection = new Connection(clusterApiUrl("devnet"));
        const compatiblePublicKey = new PublicKey(umi.identity.publicKey);

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            myKeypairSigner, // payer
            mint,
            compatiblePublicKey // owner
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            myKeypairSigner,
            mint,
            recipient
        );

        await transfer(
            connection,
            myKeypairSigner, // payer
            fromTokenAccount.address,
            toTokenAccount.address,
            compatiblePublicKey, // owner
            1
        );

        console.log(`NFT successfully transferred to ${toPublicKey}`);
    } catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
}
