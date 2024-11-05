import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";

import { assert, use } from "chai";
import web3 = anchor.web3;
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSOL = balance / web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSOL);
    console.log(`Balance of account ${user.publicKey}: ${formattedBalance} SOL`);
  });

  // it("Is initialized!", async () => {
  //   const tx = await program.methods.initialize().rpc();
  //   console.log("Your transaction signature", tx);
  // });

  it("Save a user's favorites to the blockchain!", async () => {
    const favoriteNumber = new anchor.BN(7);
    const favoriteColor = "pink";
    const favoriteHobbies = ["reading", "travelling"];

    let txHash = await program.methods
      .setFavorites(favoriteNumber, favoriteColor, favoriteHobbies)
      .signers([user])
      .rpc();

    console.log("txHash", txHash);

    const [favoritesPda, favoritesBump] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );

    const favoritesAccount = await program.account.favorites.fetch(
      favoritesPda
    );

    assert.equal(favoritesAccount.number.toString(), favoriteNumber.toString());
    assert.equal(favoritesAccount.color, favoriteColor);
    assert.deepEqual(favoritesAccount.hobbies, favoriteHobbies);
  });
});
