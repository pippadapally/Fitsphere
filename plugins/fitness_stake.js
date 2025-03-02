const anchor = require('@project-coral/anchor');
const { Connection, PublicKey } = require('@solana/web3.js');

const programId = new PublicKey('532ULNntmX3fRUzj3rP8g4k6hez3qjYSVJwHJcxfWnn7');
const connection = new Connection("https://api.devnet.solana.com");

async function stakeTokens(wallet, goalSteps) {
    const provider = new anchor.AnchorProvider(connection, wallet, {});
    const program = new anchor.Program(idl, programId, provider);

    const tx = await program.methods.stakeTokens(goalSteps)
        .accounts({
            stakeAccount: wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

    console.log("Stake transaction:", tx);
}

async function trackSteps(wallet, steps) {
    const provider = new anchor.AnchorProvider(connection, wallet, {});
    const program = new anchor.Program(idl, programId, provider);

    const tx = await program.methods.trackSteps(steps)
        .accounts({
            stakeAccount: wallet.publicKey,
        })
        .rpc();

    console.log("Track steps transaction:", tx);
}

module.exports = { stakeTokens, trackSteps };
