import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import {TokenLaunchPad} from  './components/TokenLaunchPad'
import { Token2022 } from './components/TOKEN2022';

function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 20
              }}>
              <WalletMultiButton/>
              <WalletDisconnectButton/>
            </div>
            {/* <TokenLaunchPad></TokenLaunchPad> */}
            <Token2022></Token2022>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App
