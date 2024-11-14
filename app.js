// Importing necessary modules from @solana/web3.js
import {
    Connection,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey
} from '@solana/web3.js';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Global variable to store the generated account for transfer
let generatedAccount = null;
let connectedWallet = null; // Store the connected wallet

// 1. Create New Account and Airdrop 2 SOL
async function createAccount() {
    console.log("Create Account button clicked");
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    generatedAccount = Keypair.generate(); // Generate a new account
    console.log('New Account Public Key:', generatedAccount.publicKey.toBase58());

    // Airdrop 2 SOL
    const airdropSignature = await connection.requestAirdrop(generatedAccount.publicKey, 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropSignature);
    console.log('Airdrop of 2 SOL completed');

    // Check balance after airdrop
    const balance = await checkBalance(generatedAccount.publicKey.toBase58());
    if (balance >= 2) {
        console.log('Successfully received 2 SOL!');
    } else {
        console.log('Airdrop not received yet.');
    }
}

// 2. Connect to Phantom Wallet
async function connectPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            connectedWallet = response.publicKey; // Save connected wallet public key
            console.log('Connected to Phantom Wallet:', connectedWallet.toString());

            // Check balance of connected wallet
            const walletBalance = await checkBalance(connectedWallet.toString());
            console.log(`Connected wallet balance: ${walletBalance} SOL`);
        } catch (err) {
            console.error('User rejected the connection request');
        }
    } else {
        alert('Phantom Wallet not found');
    }
}

// 3. Transfer 1 SOL to Connected Wallet
async function transferSOL(amount = 1) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    if (!generatedAccount || !connectedWallet) {
        console.error("Account or wallet not found. Please create an account and connect wallet first.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        console.error("Invalid amount for transfer");
        return; // Exit the function if amount is not valid
    }

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: generatedAccount.publicKey,
            toPubkey: connectedWallet,
            lamports: amount * LAMPORTS_PER_SOL,
        })
    );

    try {
        const signature = await sendAndConfirmTransaction(connection, transaction, [generatedAccount]);
        console.log('Transfer successful!', signature);
        const remainingBalance = await checkBalance(generatedAccount.publicKey.toBase58());
        console.log(`Remaining balance after transfer: ${remainingBalance} SOL`);
    } catch (error) {
        console.error('Transfer failed:', error);
    }
}

// Check Balance Function
async function checkBalance(publicKey) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    
    try {
        const balance = await connection.getBalance(new PublicKey(publicKey));
        console.log(`Balance of ${publicKey}: ${balance / LAMPORTS_PER_SOL} SOL`);
        return balance / LAMPORTS_PER_SOL; // Balance ko SOL mein return karein
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Expose functions to the global window
window.createAccount = createAccount;
window.connectPhantomWallet = connectPhantomWallet;
window.transferSOL = transferSOL;
window.checkBalance = checkBalance;
