// PatientDashboard.jsx — The main screen for logged-in patients.
// Also used when a doctor clicks "View as Patient" — in that case viewingAsDoctor=true
// which shows a banner and a "Back to Doctor view" button.
//
// State:
//   activeView: 'exercises' | 'library' | 'messages'
//   completed: a Set of exercise IDs the patient has ticked off today
//
// Architecture note: Sets in JavaScript are like arrays but they guarantee
// uniqueness — perfect for tracking which exercise IDs are completed.
// Because React state needs to be replaced (not mutated) to trigger a re-render,
// we create a new Set each time: setCompleted(new Set([...prev, id]))

import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ExerciseChecklist from '../components/ExerciseChecklist.jsx'
import ExerciseLibrary from '../components/ExerciseLibrary.jsx'
import MessagingPanel from '../components/MessagingPanel.jsx'
import { patients, doctor } from '../data/dummy.js'

const NAV_ITEMS = [
  { id: 'exercises', icon: '✅', label: 'My Exercises' },
  { id: 'library',   icon: '📚', label: 'Exercise Library' },
  { id: 'messages',  icon: '💬', label: 'Messages' },
]

function PatientDashboard({ patientId, onLogout, viewingAsDoctor, onBackToDoctor }) {
  const [activeView, setActiveView] = useState('exercises')
  const [completed, setCompleted] = useState(new Set())

  const patient = patients.find(p => p.id === patientId)

  function toggleExercise(exerciseId) {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(exerciseId)) {
        next.delete(exerciseId)
      } else {
        next.add(exerciseId)
      }
      return next
    })
  }

  return (
    <div className="app-shell">
      <Sidebar
        brand={{ title: 'PhysioConnect', subtitle: 'Patient Portal' }}
        navItems={NAV_ITEMS}
        activeView={activeView}
        onNavChange={setActiveView}
        footerUser={{
          name: patient?.name || 'Patient',
          role: patient?.condition || '',
          avatar: patient?.avatar || '??'
        }}
        onLogout={onLogout}
      />

      <div className="main-content">
        {/* "Viewing as patient" banner for doctors */}
        {viewingAsDoctor && (
          <div style={{
            background: '#fefce8',
            border: '1px solid #fde68a',
            borderRadius: 8,
            padding: '10px 16px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13
          }}>
            <span>👁 You're viewing <strong>{patient?.name}</strong>'s patient portal</span>
            <button
              onClick={onBackToDoctor}
              style={{
                background: '#1d4ed8',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer'
              }}
            >
              ← Back to Doctor view
            </button>
          </div>
        )}

        {activeView === 'exercises' && (
          <>
            <div className="page-header">
              <h2>My Exercises</h2>
              <p>Tick off each exercise as you complete it today</p>
            </div>
            <ExerciseChecklist
              patientId={patientId}
              completed={completed}
              onToggle={toggleExercise}
            />
          </>
        )}

        {activeView === 'library' && (
          <ExerciseLibrary role="patient" />
        )}

        {activeView === 'messages' && (
          <>
            <div className="page-header">
              <h2>Messages</h2>
              <p>Your conversation with {doctor.name}</p>
            </div>
            <MessagingPanel role="patient" patientId={patientId} />
          </>
        )}
      </div>
    </div>
  )
}

export default PatientDashboard
