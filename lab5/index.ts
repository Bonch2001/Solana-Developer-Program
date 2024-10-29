import "dotenv/config";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
    createSignerFromKeypair,
    signerIdentity,
} from "@metaplex-foundation/umi";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection } from "@solana/web3.js";

import { uploadNftImage } from "./nft_image";
import { uploadNftMetadata } from "./nft_metadata";
import { mintNft } from "./nft_mint";
import { transferNft } from "./nft_transfer";

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));
const umi = createUmi(connection);

let keypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
const myKeypairSigner = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());
umi.use(irysUploader());

const NFT_DATA = {
    name: "Telegram NFT",
    symbol: "TG",
    description: "Telegram nft description",
    imgFilePath: "telegram.png",
};

console.log("Loaded user:", user.publicKey.toBase58());

// main
(async () => {
    try {
        // 1. Upload image
        const imgUri = await uploadNftImage(umi, NFT_DATA.imgFilePath);

        // 2. Upload metadata
        const metadataUri = await uploadNftMetadata(umi, NFT_DATA, imgUri!);

        // 3. Mint NFT
        await mintNft(umi, metadataUri!, NFT_DATA);

        // 4. TODO: update metadata

        // 5. TODO: transfer
        // await transferNft(umi, myKeypairSigner, mintedNftAddress, RECIPIENT_PUBLIC_KEY);
    } catch (error) {
        console.log(`Oops.. Something went wrong ${error}`);
    }
})();