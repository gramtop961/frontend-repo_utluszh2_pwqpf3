import { useState } from 'react'
import { Download } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDownload = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/ppt/ipb-ui`)
      if (!res.ok) throw new Error('Gagal membuat file. Coba lagi.')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Profil_IPB_dan_UI.pptx'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generator PPT: IPB & UI</h1>
        <p className="text-gray-600 mb-6">Klik tombol di bawah untuk mengunduh presentasi yang merangkum profil, jalur masuk, dan fakultas dari IPB University dan Universitas Indonesia.</p>

        <button
          onClick={handleDownload}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
        >
          <Download size={20} />
          {loading ? 'Membuat file...' : 'Unduh PPT'}
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-sm">{error}</div>
        )}

        <div className="mt-8 text-xs text-gray-500">
          Catatan: Jika tombol tidak berfungsi, pastikan layanan backend aktif dan variabel lingkungan VITE_BACKEND_URL telah diatur.
        </div>
      </div>
    </div>
  )
}

export default App
