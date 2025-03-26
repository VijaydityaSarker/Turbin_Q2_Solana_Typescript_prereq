import bs58 from 'bs58';
import * as fs from 'fs';
import promptSync from 'prompt-sync';

// Initialize prompt-sync
const prompt = promptSync();

// Path to your dev-wallet.json file
const walletFilePath = './dev-wallet.json';

// Function to convert wallet private key (dictionary) to base58
function walletToBase58(): void {
    try {
        // Read the wallet file
        const secretKeyObj = JSON.parse(fs.readFileSync(walletFilePath, 'utf8'));

        // Convert dictionary values to Uint8Array
        const secretKey = new Uint8Array(Object.values(secretKeyObj));

        // Encode to base58
        const base58 = bs58.encode(secretKey);
        console.log("Base58 Encoded Private Key:", base58);
    } catch (error) {
        console.error("Error reading or encoding wallet:", error);
    }
}

// Function to decode base58 string back to private key byte array
function base58ToWallet(): void {
    const base58 = prompt("Enter your base58 encoded private key: ");

    try {
        const wallet = bs58.decode(base58);
        console.log("Decoded Wallet (private key in byte array):", wallet);
    } catch (error) {
        console.error("Error decoding base58 string:", error);
    }
}

// Ask user which function to run
console.log("Choose an option:");
console.log("1. Convert Base58 to Wallet (private key in byte array)");
console.log("2. Convert Wallet (from dev-wallet.json) to Base58");

const choice = prompt("Enter 1 or 2: ");

if (choice === "1") {
    base58ToWallet();
} else if (choice === "2") {
    walletToBase58();
} else {
    console.log("Invalid choice. Please enter 1 or 2.");
}
