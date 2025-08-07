export default function TestPage() {
  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Test Page - S17 Trading</h1>
      <p>If you can see this, Next.js is working correctly!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  )
}
