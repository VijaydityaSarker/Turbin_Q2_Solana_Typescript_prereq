import { Keypair } from "@solana/web3.js";

// Generate a new keypair
let kp = Keypair.generate();

console.log(`You've generated a new Solana wallet:`);
console.log(kp.publicKey.toBase58());


// Output the secret key (private key) in JSON format
console.log(JSON.stringify(kp.secretKey));
