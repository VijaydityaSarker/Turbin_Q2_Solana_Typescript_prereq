import { Keypair } from "@solana/web3.js";
import * as fs from 'fs';

// Read the private key from the file
const secretKeyObj = JSON.parse(fs.readFileSync('./dev-wallet.json', 'utf8'));
const secretKey = new Uint8Array(Object.values(secretKeyObj));

try {
    // Create the keypair from the secret key
    const keypair = Keypair.fromSecretKey(secretKey);
  
    // Log the public key
    console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
  } catch (error) {
    console.error("Error loading keypair: ", error);
  }
