###Solana Devnet Airdrop & Enrollment Project

#This hands-on project was built as part of the Q2 2025 Solana Prerequisite coursework and is designed to deepen your understanding of Solana development using TypeScript.

#Overview-
This project demonstrates a complete workflow for interacting with the Solana Devnet. It covers essential blockchain operations including:
Wallet Management: Generating a new Solana wallet (keypair) and converting between wallet formats.
Token Airdrop: Requesting SOL tokens from the Devnet.
Token Transfer: Executing transfers, including fee calculations and emptying a wallet.
Course Enrollment: Interacting with a Turbin3 enrollment smart contract using Anchor and Program Derived Addresses (PDAs).


#Project Structure-
keygen.ts: Generates a new Solana wallet (keypair) and outputs both the public and secret keys.
convert.ts: Provides utility functions for converting wallet formats (e.g., between Solana’s byte array format and Phantom’s base58-encoded string).
airdrop.ts: Connects to the Solana Devnet and requests airdropped SOL tokens.
transfer.ts: Transfers SOL tokens from your Devnet wallet to a designated Turbin3 wallet. It includes logic to calculate fees so the account can be emptied correctly.
enroll.ts: Uses Anchor to interact with the Turbin3 enrollment smart contract, submitting your GitHub account details and completing the enrollment process.
package.json & tsconfig.json: Project configuration files detailing dependencies, scripts, and TypeScript settings.


#How It Works
Wallet Generation: Utilizes @solana/web3.js to create and manage secure keypairs.
Token Management: Simulates a real-world workflow by requesting airdropped tokens and handling transfers with precise fee calculations.
Smart Contract Integration: Leverages Anchor to connect with a deployed enrollment program on the Solana Devnet, using a PDA to securely link your account to the enrollment process.
Conversion Utility: Provides conversion between Solana’s wallet format and Phantom’s base58 format using the bs58 package.


#Acknowledgements-
Solana
Anchor Framework
Turbin3 for providing the course prerequisites and enrollment process details.

