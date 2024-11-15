projects for module - 2 deploy a hello world program 
we are here create three buttons but we are ensure the setup before the start 
Explanation of Each Button Function:
Button 1 - Create a New Solana Account (createAccount function):

This button generates a new Solana account.
It creates a keypair (with public and private keys), connects to the Solana Devnet, and requests an airdrop of 2 SOL for testing.
The function logs the new account’s public key and confirms the transaction in the console.
Button 2 - Connect to Phantom Wallet (connectToPhantom function):

This button checks if Phantom Wallet is available in your browser.
If it finds Phantom Wallet, it connects and retrieves the wallet’s public key, which it logs in the console.
If Phantom is not installed, it shows an alert to prompt the user to install Phantom.
Button 3 - Transfer SOL (transferSol function):

This button allows you to transfer SOL from the Phantom wallet to another Solana wallet.
The function establishes a connection with the Solana Devnet and specifies the sender and recipient addresses.
It creates and signs a transaction, transfers the specified amount of SOL, and logs the transaction details, including the signature.
Final Steps to Run:
Run the HTML file in a Browser: Open the index.html file in a browser where Phantom Wallet is installed.

Check Console for Outputs: Open the browser’s Developer Console to view logs for keypairs, public keys, and transaction signatures
