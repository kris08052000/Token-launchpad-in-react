import {MINT_SIZE, getMinimumBalanceForRentExemptMint, TOKEN_PROGRAM_ID, createInitializeMint2Instruction} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export function TokenLaunchPad(){
    const wallet = useWallet();
    const {connection} = useConnection();

    async function createToken() {
        const name = document.getElementById("name").value;
        const Symbol = document.getElementById("Symbol").value;
        const image = document.getElementById("image").value;
        const initialSupply = document.getElementById("initialSupply").value;

        //createMint();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate();
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId:TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
        );

        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey;

        transaction.partialSign(keypair);
        let response = await wallet.sendTransaction(transaction, connection);
        console.log(response);
    
    }
    return <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id='name' className="inputText" type="text" placeholder="Name"></input> <br/>
        <input id='Symbol' className="inputText" type="text" placeholder="Symbol"></input> <br/>
        <input id='image' className="inputText" type="text" placeholder="Image URL"></input> <br/>
        <input id='initialSupply' className="inputText" type="text" placeholder="Initial Supply"></input> <br/>
        <button onClick={createToken} className="btn">Create a token</button>

    </div>
}