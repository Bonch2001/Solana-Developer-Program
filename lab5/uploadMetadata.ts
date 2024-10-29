import { Metaplex, toMetaplexFile } from "@metaplex-foundation/js";
import fs from "fs";

export async function uploadMetadata(metaplex: Metaplex, data: any): Promise<string> {
  const buffer = fs.readFileSync(data.imagePath);

  const file = toMetaplexFile(buffer, data.imagePath);

  const imgUri = await metaplex.storage().upload(file);

  console.log({ message: `✅ Uploaded image to`, imgUri });

  const { uri } = await metaplex.nfts().uploadMetadata({
    name: data.name,
    symbol: data.symbol,
    description: data.description,
    image: imgUri,
  });

  console.log({ message: `✅ Uploaded off-chain metadata to`, uri });
  return uri;
}
