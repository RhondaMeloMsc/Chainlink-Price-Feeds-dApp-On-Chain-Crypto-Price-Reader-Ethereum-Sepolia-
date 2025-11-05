
import PriceViewer from './components/PriceViewer.jsx'

export default function App() {
  return (
    <div style={styles.page}>
      <h1 style={styles.h1}>Chainlink Price Feeds dApp (Sepolia)</h1>
      <p style={styles.p}>Reads on-chain prices via a consumer contract and (optionally) directly from the feed.</p>
      <div style={styles.card}>
        <PriceViewer />
      </div>
      <p style={{...styles.p, marginTop: 24}}>
        Set NEXT_PUBLIC_CONSUMER_ADDRESS in .env.local. Optionally set NEXT_PUBLIC_FEED_ADDRESS to read the feed directly.
      </p>
    </div>
  )
}

const styles = {
  page: { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', padding: 24, maxWidth: 780, margin: '0 auto' },
  h1: { fontSize: 28, marginBottom: 8 },
  p: { color: '#444' },
  card: { border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, marginTop: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }
}
