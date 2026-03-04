// PatientList.jsx — Left panel in the doctor's Patients view.
// Renders a scrollable list of patients. Clicking one selects it.

import { patients } from '../data/dummy.js'

function PatientList({ selectedId, onSelect }) {
  return (
    <div className="split-left">
      <div className="panel-header">My Patients</div>
      {patients.map(patient => (
        <button
          key={patient.id}
          className={`patient-item ${selectedId === patient.id ? 'active' : ''}`}
          onClick={() => onSelect(patient.id)}
        >
          <div className="avatar sm">{patient.avatar}</div>
          <div className="patient-item-info">
            <strong>{patient.name}</strong>
            <span>{patient.condition}</span>
            <span className="last-active">Active {patient.lastActive}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default PatientList
