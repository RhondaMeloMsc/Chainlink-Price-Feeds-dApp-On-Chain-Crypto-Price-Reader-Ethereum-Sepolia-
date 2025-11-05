
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const CONSUMER_ABI = [
  'function latestPrice() view returns (int256 price, uint8 decimals, string desc, uint256 updatedAt)'
]

const FEED_ABI = [
  'function decimals() view returns (uint8)',
  'function description() view returns (string)',
  'function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)'
]

export default function PriceViewer() {
  const [account, setAccount] = useState('')
  const [status, setStatus] = useState('Idle')
  const [onchain, setOnchain] = useState(null)
  const [direct, setDirect] = useState(null)

  async function connect() {
    if (!window.ethereum) { alert('MetaMask not detected'); return }
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    setAccount(await signer.getAddress())
    await refresh(signer)
  }

  function toDisplay(price, decimals) {
    const d = Number(decimals)
    return (Number(price) / (10 ** d)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 })
  }

  async function refresh(signer) {
    try {
      setStatus('Reading on-chain...')
      const consumerAddr = import.meta.env.VITE_CONSUMER || process.env.NEXT_PUBLIC_CONSUMER_ADDRESS || import.meta.env.NEXT_PUBLIC_CONSUMER_ADDRESS
      if (!consumerAddr) throw new Error('Set NEXT_PUBLIC_CONSUMER_ADDRESS')
      const c = new ethers.Contract(consumerAddr, CONSUMER_ABI, signer ?? new ethers.BrowserProvider(window.ethereum))
      const out = await c.latestPrice()
      setOnchain({
        price: toDisplay(out[0], out[1]),
        decimals: Number(out[1]),
        desc: out[2],
        updatedAt: new Date(Number(out[3]) * 1000).toLocaleString()
      })

      // Optional: read feed directly if provided
      const feedAddr = import.meta.env.VITE_FEED || process.env.NEXT_PUBLIC_FEED_ADDRESS || import.meta.env.NEXT_PUBLIC_FEED_ADDRESS
      if (feedAddr) {
        setStatus('Reading feed directly...')
        const provider = new ethers.BrowserProvider(window.ethereum)
        const feed = new ethers.Contract(feedAddr, FEED_ABI, provider)
        const [decimals, description, roundData] = await Promise.all([
          feed.decimals(),
          feed.description(),
          feed.latestRoundData()
        ])
        setDirect({
          price: toDisplay(roundData[1], decimals),
          decimals: Number(decimals),
          desc: description,
          updatedAt: new Date(Number(roundData[3]) * 1000).toLocaleString()
        })
      }
      setStatus('Done.')
    } catch (e) {
      setStatus(e.message || 'Error')
    }
  }

  useEffect(() => {
    // nothing on mount
  }, [])

  return (
    <div>
      <button onClick={connect} style={{ padding: '8px 12px' }}>{account ? 'Wallet Connected' : 'Connect Wallet'}</button>
      {account && <p style={{ marginTop: 8 }}>Address: {account}</p>}

      <div style={{ marginTop: 16 }}>
        <h3>On-chain via PriceConsumer</h3>
        {onchain ? (
          <ul>
            <li>Pair: {onchain.desc}</li>
            <li>Price: {onchain.price}</li>
            <li>Updated: {onchain.updatedAt}</li>
          </ul>
        ) : <p>Not loaded yet.</p>}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Direct from Chainlink Feed (optional)</h3>
        {direct ? (
          <ul>
            <li>Pair: {direct.desc}</li>
            <li>Price: {direct.price}</li>
            <li>Updated: {direct.updatedAt}</li>
          </ul>
        ) : <p>Provide NEXT_PUBLIC_FEED_ADDRESS to enable direct reading.</p>}
      </div>

      <p style={{ marginTop: 16, color: '#6b7280' }}>Status: {status}</p>
    </div>
  )
}
