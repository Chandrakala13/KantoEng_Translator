import { useState } from 'react'

function App() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate')
      return
    }

    setLoading(true)
    setError('')
    setTranslatedText('')

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: inputText,
          from: 'kn',
          to: 'en'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setTranslatedText(data.translated)
      } else {
        setError(data.error || 'Translation failed')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const handleSwap = () => {
    setInputText(translatedText)
    setTranslatedText('')
  }

  const handleClear = () => {
    setInputText('')
    setTranslatedText('')
    setError('')
  }

  return (
    <div className="translator-container">
      <h1 className="title">Kannada to English Translator</h1>
      
      <div className="translator-box">
        <div className="input-section">
          <label className="label">Kannada</label>
          <textarea
            className="text-input"
            placeholder="Enter Kannada text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="button-section">
          <button 
            className="btn translate-btn" 
            onClick={handleTranslate}
            disabled={loading}
          >
            {loading ? 'Translating...' : 'Translate →'}
          </button>
          
          {translatedText && (
            <>
              <button 
                className="btn swap-btn" 
                onClick={handleSwap}
                title="Use result as input"
              >
                ⇄ Swap
              </button>
              <button 
                className="btn clear-btn" 
                onClick={handleClear}
              >
                Clear
              </button>
            </>
          )}
        </div>

        <div className="output-section">
          <label className="label">English</label>
          <textarea
            className="text-input output"
            placeholder="Translation will appear here..."
            value={translatedText}
            readOnly
          />
        </div>

        {error && <div className="error">{error}</div>}
      </div>

      <p className="footer">Type in Kannada and click translate to convert to English</p>
    </div>
  )
}

export default App