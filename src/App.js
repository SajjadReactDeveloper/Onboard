import React, { useEffect } from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { useState } from 'react'
import Onboard from '@web3-onboard/core'
import safeModule from '@web3-onboard/gnosis'

const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule();
const safe = safeModule();

const infuraKey = 'e200479dc89a4072a05c7aa1c0f83147'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

// initialize Onboard
init({
  apiKey,
  wallets: [injected, safe],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc'
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    }
  ]
})

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [account, setAccount] = useState(null)


  useEffect(() => {
    if (wallet?.provider) {
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
      })
    }
  }, [wallet])

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    
  }

  return (
    <div>
          <div>{ account?.address }</div>
          <div>Connected to {wallet?.label}</div>
          <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
            {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
          </button>
          <button >
            Get Safe WAllet
          </button>
    </div>
  )
}

export default App