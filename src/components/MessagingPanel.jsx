// MessagingPanel.jsx — The in-app messaging UI.
// For doctors: shows a list of patients on the left, conversation on the right.
// For patients: jumps straight to the conversation with their doctor.
//
// Messages are stored in React state (initialised from dummy data).
// Sending a message appends it locally — no backend yet (that's Milestone 2).
//
// Architecture note: useState with an object keyed by patientId lets us store
// all conversations in one place and switch between them without losing messages.

import { useState } from 'react'
import { patients, initialMessages, doctor } from '../data/dummy.js'

function MessagingPanel({ role, patientId }) {
  // messages is an object: { p1: [...], p2: [...], p3: [...] }
  const [messages, setMessages] = useState(initialMessages)
  const [selectedPatientId, setSelectedPatientId] = useState(
    patientId || patients[0].id
  )
  const [inputText, setInputText] = useState('')

  const activePatient = patients.find(p => p.id === selectedPatientId)
  const activeMessages = messages[selectedPatientId] || []

  function sendMessage() {
    const trimmed = inputText.trim()
    if (!trimmed) return

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: role,  // 'doctor' or 'patient'
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => ({
      ...prev,
      [selectedPatientId]: [...(prev[selectedPatientId] || []), newMsg]
    }))
    setInputText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Patient view: no conversation list, just the chat
  if (role === 'patient') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
        <ChatHeader patient={activePatient} otherName={doctor.name} />
        <ChatMessages messages={activeMessages} role={role} />
        <ChatInput
          value={inputText}
          onChange={setInputText}
          onSend={sendMessage}
          onKeyDown={handleKeyDown}
        />
      </div>
    )
  }

  // Doctor view: patient list on left + chat on right
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 140px)', overflow: 'hidden' }}>
      {/* Conversation list */}
      <div className="conversation-list">
        <div className="panel-header">Conversations</div>
        {patients.map(p => {
          const lastMsg = (messages[p.id] || []).slice(-1)[0]
          return (
            <button
              key={p.id}
              className={`convo-item ${selectedPatientId === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPatientId(p.id)}
            >
              <div className="avatar sm">{p.avatar}</div>
              <div className="convo-info">
                <strong>{p.name}</strong>
                <span>{lastMsg ? lastMsg.text.slice(0, 32) + '…' : 'No messages yet'}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Chat area */}
      <div className="chat-panel">
        <ChatHeader patient={activePatient} otherName={activePatient?.name} />
        <ChatMessages messages={activeMessages} role={role} />
        <ChatInput
          value={inputText}
          onChange={setInputText}
          onSend={sendMessage}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

function ChatHeader({ patient, otherName }) {
  return (
    <div className="chat-header">
      <div className="avatar sm">{patient?.avatar || '👤'}</div>
      <div>
        <strong>{otherName}</strong>
        <span style={{ display: 'block', fontSize: 12, color: '#64748b' }}>
          {patient?.condition}
        </span>
      </div>
    </div>
  )
}

function ChatMessages({ messages, role }) {
  return (
    <div className="chat-messages">
      {messages.map(msg => {
        // "sent" = message from the current user (right side, blue)
        const isSent = msg.sender === role
        return (
          <div key={msg.id} className={`message-bubble ${isSent ? 'sent' : 'received'}`}>
            {msg.text}
            <span className="time">{msg.timestamp}</span>
          </div>
        )
      })}
      {messages.length === 0 && (
        <div className="empty-state">
          <span>💬</span>
          No messages yet — start the conversation!
        </div>
      )}
    </div>
  )
}

function ChatInput({ value, onChange, onSend, onKeyDown }) {
  return (
    <div className="chat-input-bar">
      <textarea
        className="chat-input"
        rows={1}
        placeholder="Type a message… (Enter to send)"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="send-btn" onClick={onSend}>Send</button>
    </div>
  )
}

export default MessagingPanel
