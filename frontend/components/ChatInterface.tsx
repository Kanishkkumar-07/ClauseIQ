'use client'

import { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'
import MessageBubble from './MessageBubble'
import LoadingSpinner from './LoadingSpinner'

type Message = {
  role: 'user' | 'ClauseIQ Agent'
  content: string
}

type Props = {
  documentId: string
}

export default function ChatInterface({
  documentId
}: Props) {

  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {

    if (!question.trim()) return

    const userQuestion = question

    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: userQuestion
      }
    ])

    setQuestion('')
    setLoading(true)

    try {

      const response = await fetch(
        'http://localhost:8000/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: userQuestion,
            document_id: documentId
          })
        }
      )

      const data = await response.json()

        if (!data.answer) {
        throw new Error("No answer returned")
        }

        setMessages(prev => [
        ...prev,
        {
            role: "ClauseIQ Agent",
            content: data.answer
        }
        ])

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="flex flex-col h-screen bg-[oklch(0.098_0.008_264)] relative overflow-hidden">
      {/* Ambient glow top */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[oklch(0.68_0.22_264/0.06)] blur-[80px] rounded-full" />

      {/* Header */}
      <header className="relative z-10 border-b border-[oklch(0.22_0.015_264)] bg-[oklch(0.11_0.01_264/0.9)] backdrop-blur-xl">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-[oklch(0.68_0.22_264)] rounded-xl blur-[6px] opacity-40" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-[oklch(0.75_0.22_264)] to-[oklch(0.55_0.26_264)] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm tracking-tight">CQ</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[oklch(0.96_0.006_264)] tracking-tight">ClauseIQ</h1>
              <p className="text-[10px] text-[oklch(0.52_0.02_264)] tracking-wide">
                doc: <span className="text-[oklch(0.68_0.22_264)]">{documentId}</span>
              </p>
            </div>
          </div>
          {/* Status pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[oklch(0.17_0.012_264)] border border-[oklch(0.22_0.015_264)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.18_150)] animate-pulse" />
            <span className="text-[10px] text-[oklch(0.52_0.02_264)] tracking-wide">Live</span>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-6">
              {/* Hero icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-[oklch(0.68_0.22_264/0.25)] rounded-3xl blur-[20px]" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-[oklch(0.75_0.22_264)] to-[oklch(0.52_0.26_264)] rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-xl tracking-tight">CQ</span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[oklch(0.96_0.006_264)] tracking-[-0.02em]">Welcome to ClauseIQ</h2>
                <p className="text-[oklch(0.50_0.018_264)] max-w-sm text-sm leading-relaxed font-light">
                  Ask questions about your legal document and get instant insights powered by AI.
                </p>
              </div>
              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 justify-center mt-2 max-w-md">
                {['Summarize key clauses', 'Find liability sections', 'List parties involved'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuestion(s)}
                    className="px-3 py-1.5 text-xs rounded-full border border-[oklch(0.22_0.015_264)] text-[oklch(0.60_0.02_264)] bg-[oklch(0.13_0.01_264)] hover:border-[oklch(0.68_0.22_264/0.5)] hover:text-[oklch(0.80_0.12_264)] transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              {loading && <LoadingSpinner />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 border-t border-[oklch(0.22_0.015_264)] bg-[oklch(0.11_0.01_264/0.9)] backdrop-blur-xl">
        {/* Subtle top separator glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[oklch(0.68_0.22_264/0.4)] to-transparent" />
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
                    sendMessage()
                  }
                }}
                placeholder="Ask a question about this document..."
                disabled={loading}
                className="w-full px-5 py-3.5 rounded-2xl border border-[oklch(0.22_0.015_264)] bg-[oklch(0.15_0.012_264)] text-[oklch(0.92_0.006_264)] placeholder:text-[oklch(0.38_0.015_264)] focus:outline-none focus:border-[oklch(0.62_0.22_264/0.6)] focus:ring-1 focus:ring-[oklch(0.62_0.22_264/0.3)] focus:bg-[oklch(0.16_0.014_264)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm"
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={loading || !question.trim()}
              className="relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden group disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              {/* Button glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.75_0.22_264)] to-[oklch(0.52_0.26_264)] transition-opacity duration-200" />
              <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.82_0.22_264)] to-[oklch(0.60_0.26_264)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute inset-0 shadow-lg group-hover:shadow-[0_0_20px_oklch(0.68_0.22_264/0.5)] transition-all duration-200 rounded-2xl" />
              <Send className="w-4 h-4 text-white relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
          <p className="text-center text-[11px] text-[oklch(0.30_0.01_264)] mt-3 font-light tracking-wide">
            ClauseIQ · AI Legal Analysis
          </p>
        </div>
      </div>
    </div>
  )
}