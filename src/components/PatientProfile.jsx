// PatientProfile.jsx — Shows a patient's progress metrics and their exercise plan.
// The doctor sees this when they click on a patient.
// It has two sub-tabs: Overview (metrics) and Exercise Plan.

import { useState } from 'react'
import { patients, exercises } from '../data/dummy.js'
import ExercisePlan from './ExercisePlan.jsx'

function PatientProfile({ patientId, onViewAsPatient }) {
  const [subView, setSubView] = useState('overview')

  const patient = patients.find(p => p.id === patientId)
  if (!patient) return null

  const { progress } = patient

  return (
    <div>
      {/* Patient header */}
      <div className="profile-header">
        <div className="avatar" style={{ width: 52, height: 52, fontSize: 16 }}>
          {patient.avatar}
        </div>
        <div>
          <h2>{patient.name}</h2>
          <p>{patient.condition}</p>
        </div>
        <button
          className="view-as-patient-btn"
          style={{ marginLeft: 'auto' }}
          onClick={() => onViewAsPatient(patient.id)}
        >
          👁 View as Patient
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="sub-tabs">
        <button
          className={`sub-tab ${subView === 'overview' ? 'active' : ''}`}
          onClick={() => setSubView('overview')}
        >
          Overview
        </button>
        <button
          className={`sub-tab ${subView === 'exercises' ? 'active' : ''}`}
          onClick={() => setSubView('exercises')}
        >
          Exercise Plan
        </button>
      </div>

      {subView === 'overview' && (
        <Overview patient={patient} progress={progress} />
      )}

      {subView === 'exercises' && (
        <ExercisePlan patientId={patientId} />
      )}
    </div>
  )
}

function Overview({ patient, progress }) {
  return (
    <>
      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="value" style={{ color: '#16a34a' }}>{progress.completionPercent}%</span>
          <span className="label">Overall completion</span>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress.completionPercent}%` }} />
          </div>
        </div>
        <div className="metric-card">
          <span className="value">{progress.streak}</span>
          <span className="label">🔥 Day streak</span>
        </div>
        <div className="metric-card">
          <span className="value">{progress.doneThisWeek}/{progress.totalThisWeek}</span>
          <span className="label">Sessions this week</span>
        </div>
      </div>

      {/* Weekly trend */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p className="section-title">Weekly completion trend</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
          {progress.weeklyHistory.map((val, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: '100%',
                  height: `${val}%`,
                  maxHeight: 60,
                  background: i === progress.weeklyHistory.length - 1 ? '#2563eb' : '#bfdbfe',
                  borderRadius: 4,
                  minHeight: 4
                }}
              />
              <span style={{ fontSize: 10, color: '#64748b' }}>
                {['W1','W2','W3','W4','W5'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notes placeholder */}
      <div className="card">
        <p className="section-title">Doctor notes</p>
        <p style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>
          No notes yet — in Milestone 2 you'll be able to generate an AI progress summary here.
        </p>
      </div>
    </>
  )
}

export default PatientProfile
