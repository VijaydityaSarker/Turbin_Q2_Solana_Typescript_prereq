import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from "fs";

// Read the private key from the dev-wallet.json file
const wallet = JSON.parse(fs.readFileSync("./dev-wallet.json", "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(Object.values(wallet)));

// Create a connection to the Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  try {
    console.log(`Requesting airdrop for wallet: ${keypair.publicKey.toBase58()}`);

    // Request 2 SOL from the airdrop
    const txhash = await connection.requestAirdrop(keypair.publicKey, 1.89999 * LAMPORTS_PER_SOL);

    console.log(`✅ Success! Check your transaction here:`);
    console.log(`🔗 https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`❌ Oops, something went wrong: ${e}`);
  }
})();
