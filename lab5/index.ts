import "dotenv/config";
import { Connection } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    keypairIdentity,
    Metaplex,
    irysStorage,
} from "@metaplex-foundation/js";
import { uploadMetadata } from "./uploadMetadata";
import { createNft } from "./createNft";

console.log({ message: "Connection done" });

const nftData = {
    name: "SDP Coole Nft",
    symbol: "SDP",
    description: "This is a cool NFT from Solana Developers Program - Romania RO",
    imagePath: "./lab5/solana.jpg",
};

async function main(): Promise<void> {
    const connection = new Connection("https://api.devnet.solana.com");

    const keypair = getKeypairFromEnvironment("SECRET_KEY");
    console.log(`✅ Keypair loaded: ${keypair.publicKey.toBase58()}`);

    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(keypair))
        .use(
            irysStorage({
                address: "https://devnet.bundlr.network",
                providerUrl: "https://devnet.solana.com",
                timeout: 60000,
            })
        );

    console.log("✅ Metaplex loaded");
    const uri = await uploadMetadata(metaplex, nftData);
    const nft = await createNft(metaplex, uri, nftData);

    console.log("🎉 Hooray!");
}

main().then(() => console.log("Process finished"));
