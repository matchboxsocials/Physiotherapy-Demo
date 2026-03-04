// ExercisePlan.jsx — Shows the exercises assigned to a specific patient.
// Reads the patient's exerciseIds and looks them up in the full exercises list.
// Used in both the doctor's patient profile view and (via checklist) the patient dashboard.

import { patients, exercises } from '../data/dummy.js'

function ExercisePlan({ patientId }) {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return null

  const assignedExercises = patient.exerciseIds.map(id =>
    exercises.find(ex => ex.id === id)
  ).filter(Boolean)

  return (
    <div>
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
        {assignedExercises.length} exercises assigned
      </p>
      <div className="exercise-list">
        {assignedExercises.map(ex => (
          <div key={ex.id} className="exercise-card">
            <span className="exercise-emoji">{ex.imageEmoji}</span>
            <div className="exercise-card-body">
              <h3>{ex.name}</h3>
              <p>{ex.description}</p>
              <div className="exercise-meta">
                <span className="badge blue">{ex.sets} sets × {ex.reps} reps</span>
                <span className="badge grey">{ex.category}</span>
              </div>
              <p style={{ fontSize: 12, color: '#16a34a', marginTop: 8, fontWeight: 500 }}>
                Goal: {ex.goal}
              </p>
              <p style={{ fontSize: 12, color: '#92400e', marginTop: 4 }}>
                ⚠ {ex.safetyNote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExercisePlan
