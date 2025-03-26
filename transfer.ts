import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./dev-wallet.json"; // Import your wallet file

// Initialize Keypair from private key stored in dev-wallet.json
// If the private key is stored under "privateKey" in the JSON file, we access it and create a Uint8Array.
//const from = Keypair.fromSecretKey(new Uint8Array(wallet.privateKey)); // Assuming wallet.privateKey holds the array of bytes
const from = Keypair.fromSecretKey(new Uint8Array(Object.values(wallet)));

// Define your Turbin3 public key (replace this with your Turbin3 wallet address)
const to = new PublicKey("9tyrZ8stxWctLswB1fy8GXhmhMJ288XWwNxzetBN9VpR");

// Create a Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // Get balance of dev wallet
    const balance = await connection.getBalance(from.publicKey);
    console.log(`Balance of dev wallet: ${(balance / LAMPORTS_PER_SOL).toFixed(6)} SOL`);

    // Create a test transaction to calculate fees
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      })
    );

    // Fetch recent blockhash
    const { blockhash } = await connection.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = blockhash;

    // Set the fee payer for the transaction
    transaction.feePayer = from.publicKey;

    // Calculate the fee for the transaction
    const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;

    // Remove the transfer instruction to replace it with the correct amount of lamports
    transaction.instructions.pop();

    // Add the new transfer instruction with the correct amount (balance - fee)
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee, // Subtract the fee from the balance
      })
    );

    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);

    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
