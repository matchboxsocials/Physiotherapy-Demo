// App.jsx — The root component. It holds the top-level state:
//   - role: who is logged in ('doctor' | 'patient' | null)
//   - viewingAs: when a doctor clicks "View as Patient", this stores the patient's id
//     so we can render the Patient dashboard pre-loaded with that patient's data.
//
// Think of this as the "traffic controller" of the app — it decides which page to render.

import { useState } from 'react'
import LoginScreen from './pages/LoginScreen.jsx'
import DoctorDashboard from './pages/DoctorDashboard.jsx'
import PatientDashboard from './pages/PatientDashboard.jsx'
import { patients } from './data/dummy.js'

function App() {
  const [role, setRole] = useState(null)         // null = not logged in
  const [patientId, setPatientId] = useState(patients[0].id) // default patient for patient login

  // Doctor clicks "View as Patient" for a specific patient
  const [viewingAsPatientId, setViewingAsPatientId] = useState(null)

  function handleLogin(selectedRole) {
    setRole(selectedRole)
    setViewingAsPatientId(null)
  }

  function handleLogout() {
    setRole(null)
    setViewingAsPatientId(null)
  }

  function handleViewAsPatient(id) {
    setViewingAsPatientId(id)
  }

  function handleBackToDoctor() {
    setViewingAsPatientId(null)
  }

  // Not logged in → show login
  if (!role) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Doctor viewing a patient's perspective
  if (role === 'doctor' && viewingAsPatientId) {
    return (
      <PatientDashboard
        patientId={viewingAsPatientId}
        onLogout={handleLogout}
        viewingAsDoctor
        onBackToDoctor={handleBackToDoctor}
      />
    )
  }

  if (role === 'doctor') {
    return (
      <DoctorDashboard
        onLogout={handleLogout}
        onViewAsPatient={handleViewAsPatient}
      />
    )
  }

  // Patient logged in — in a real app they'd have their own login;
  // for M1 we use the first patient as the demo patient.
  return (
    <PatientDashboard
      patientId={patients[0].id}
      onLogout={handleLogout}
    />
  )
}

export default App
