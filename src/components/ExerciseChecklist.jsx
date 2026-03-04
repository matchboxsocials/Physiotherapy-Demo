// ExerciseChecklist.jsx — The patient's daily exercise to-do list.
// Each exercise can be ticked off. The "completed" state lives in the parent
// (PatientDashboard) so it persists when the patient switches tabs.
//
// Architecture note: state is "lifted up" to PatientDashboard because the
// completion count shown in the progress bar also needs to know which exercises are done.

import { patients, exercises } from '../data/dummy.js'

function ExerciseChecklist({ patientId, completed, onToggle }) {
  const patient = patients.find(p => p.id === patientId)
  if (!patient) return null

  const assignedExercises = patient.exerciseIds.map(id =>
    exercises.find(ex => ex.id === id)
  ).filter(Boolean)

  const doneCount = assignedExercises.filter(ex => completed.has(ex.id)).length
  const total = assignedExercises.length
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0

  return (
    <div>
      {/* Progress summary bar */}
      <div className="progress-summary">
        <div className="ps-top">
          <span className="ps-label">Today's exercises</span>
          <span className="ps-count">{doneCount} / {total} done</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        {doneCount === total && total > 0 && (
          <p style={{ color: '#16a34a', fontWeight: 600, fontSize: 13, marginTop: 8 }}>
            🎉 Well done — all exercises complete for today!
          </p>
        )}
      </div>

      {/* Checklist */}
      {assignedExercises.map(ex => {
        const isDone = completed.has(ex.id)
        return (
          <div key={ex.id} className={`checklist-item ${isDone ? 'done' : ''}`}>
            <button
              className={`check-btn ${isDone ? 'checked' : ''}`}
              onClick={() => onToggle(ex.id)}
              aria-label={isDone ? `Unmark ${ex.name}` : `Mark ${ex.name} as done`}
            >
              {isDone && '✓'}
            </button>
            <span className="exercise-emoji" style={{ fontSize: 24, marginTop: 2 }}>{ex.imageEmoji}</span>
            <div className="exercise-card-body">
              <h3 style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? '#64748b' : 'inherit' }}>
                {ex.name}
              </h3>
              <p>{ex.description}</p>
              <div className="exercise-meta" style={{ marginTop: 6 }}>
                <span className="badge blue">{ex.sets} sets × {ex.reps} reps</span>
                <span className="badge grey">{ex.category}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ExerciseChecklist
