// DoctorDashboard.jsx — The main screen for logged-in doctors.
// State:
//   activeView: which section of the sidebar is selected ('patients' | 'library' | 'messages')
//   selectedPatientId: which patient is selected in the Patients view
//
// Layout: Sidebar on the left, main content on the right.
// When 'patients' is active, the main area splits again into a patient list and a detail panel.

import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import PatientList from '../components/PatientList.jsx'
import PatientProfile from '../components/PatientProfile.jsx'
import ExerciseLibrary from '../components/ExerciseLibrary.jsx'
import MessagingPanel from '../components/MessagingPanel.jsx'
import { patients, doctor } from '../data/dummy.js'

const NAV_ITEMS = [
  { id: 'patients',  icon: '👥', label: 'My Patients' },
  { id: 'library',   icon: '📚', label: 'Exercise Library' },
  { id: 'messages',  icon: '💬', label: 'Messages' },
]

function DoctorDashboard({ onLogout, onViewAsPatient }) {
  const [activeView, setActiveView] = useState('patients')
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id)

  return (
    <div className="app-shell">
      <Sidebar
        brand={{ title: 'PhysioConnect', subtitle: 'Doctor Portal' }}
        navItems={NAV_ITEMS}
        activeView={activeView}
        onNavChange={setActiveView}
        footerUser={{ name: doctor.name, role: doctor.speciality, avatar: doctor.avatar }}
        onLogout={onLogout}
      />

      {/* Patients view — split layout with patient list + detail */}
      {activeView === 'patients' && (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <PatientList
            selectedId={selectedPatientId}
            onSelect={setSelectedPatientId}
          />
          <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
            <PatientProfile
              patientId={selectedPatientId}
              onViewAsPatient={onViewAsPatient}
            />
          </div>
        </div>
      )}

      {/* Exercise library — full main area */}
      {activeView === 'library' && (
        <div className="main-content">
          <ExerciseLibrary role="doctor" />
        </div>
      )}

      {/* Messages — conversation split layout */}
      {activeView === 'messages' && (
        <div className="main-content">
          <div className="page-header">
            <h2>Messages</h2>
            <p>Chat with your patients</p>
          </div>
          <MessagingPanel role="doctor" />
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard
