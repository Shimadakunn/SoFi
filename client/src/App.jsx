import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Hero from './Pages/Hero'
import Main from './Pages/Main'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider, darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'f686c5da06280d4291e45e43fa7f0942',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function App() {
  return (
    <>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
      accentColor: '#7b3fe4',
      accentColorForeground: 'white',
      borderRadius: 'small',
      fontStack: 'system',
      overlayBlur: 'small',
    })} coolMode >
      <Router>
      <Routes>
          <Route exact path="/" element={<Hero/>}/>
          <Route exact path="/main" element={<Main/>}/>
        </Routes>
      </Router>
      </RainbowKitProvider>
    </WagmiConfig>
    </>
  )
}

export default App
