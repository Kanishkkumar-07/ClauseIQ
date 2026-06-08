'use client'

import { useState } from 'react'

type Props = {
  documentId: string
}

type Message = {
  role: 'user' | 'ClauseIQ Agent'
  content: string
}

export default function ChatInterface({
  documentId
}: Props) {

  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

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
    <div className="p-8">

      <h1>ClauseIQ</h1>

      <p>
        Document:
        {documentId}
      </p>

      <div>

        {messages.map((message, index) => (

          <div key={index}>

            <strong>
              {message.role}
            </strong>

            <p>
              {message.content}
            </p>

          </div>

        ))}

      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
            sendMessage()
            }
        }}
        placeholder="Ask a question"
        />

      <button
        onClick={sendMessage}
        disabled={loading}
        >
        {loading ? "Generating" : "Send"}
    </button>

      {loading && (
        <p>Generating</p>
      )}

    </div>
  )
}