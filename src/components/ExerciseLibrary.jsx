// ExerciseLibrary.jsx — A searchable grid of all exercises.
// Used by both doctors (to browse/add/edit) and patients (to learn).
//
// Accepts a `role` prop ('doctor' | 'patient') to control what actions are visible.
// Doctors can: add new exercises, edit the steps for any exercise.
// Patients see everything but cannot make changes.
//
// Exercise state is initialised from dummy.js but lives in local React state,
// so doctors can add/edit without affecting the source data directly.
// In Milestone 2 this will sync with the backend instead.

import { useState } from 'react'
import { exercises as initialExercises } from '../data/dummy.js'

function blankExercise() {
  return {
    name: '', category: '', description: '',
    sets: 3, reps: 10, goal: '', safetyNote: '',
    steps: [''],
  }
}

function ExerciseLibrary({ role = 'patient' }) {
  const [exerciseList, setExerciseList] = useState(initialExercises)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)   // which card is in step-edit mode
  const [draftSteps, setDraftSteps] = useState([])   // working copy of steps being edited
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEx, setNewEx] = useState(blankExercise())

  const filtered = exerciseList.filter(ex =>
    ex.name.toLowerCase().includes(search.toLowerCase()) ||
    ex.category.toLowerCase().includes(search.toLowerCase())
  )

  // ── Step editing helpers ──────────────────────────────────

  function startEditSteps(ex) {
    setEditingId(ex.id)
    setDraftSteps([...ex.steps])
  }

  function cancelEditSteps() {
    setEditingId(null)
    setDraftSteps([])
  }

  function saveSteps(id) {
    const cleaned = draftSteps.filter(s => s.trim() !== '')
    setExerciseList(prev =>
      prev.map(ex => ex.id === id ? { ...ex, steps: cleaned } : ex)
    )
    setEditingId(null)
    setDraftSteps([])
  }

  function updateDraftStep(index, value) {
    setDraftSteps(prev => prev.map((s, i) => i === index ? value : s))
  }

  function addDraftStep() {
    setDraftSteps(prev => [...prev, ''])
  }

  function removeDraftStep(index) {
    setDraftSteps(prev => prev.filter((_, i) => i !== index))
  }

  // ── Add exercise helpers ──────────────────────────────────

  function updateNewExStep(index, value) {
    setNewEx(prev => ({
      ...prev,
      steps: prev.steps.map((s, i) => i === index ? value : s)
    }))
  }

  function addNewExStep() {
    setNewEx(prev => ({ ...prev, steps: [...prev.steps, ''] }))
  }

  function removeNewExStep(index) {
    setNewEx(prev => ({ ...prev, steps: prev.steps.filter((_, i) => i !== index) }))
  }

  function saveNewExercise() {
    if (!newEx.name.trim()) return
    const id = `ex-custom-${Date.now()}`
    setExerciseList(prev => [...prev, {
      ...newEx,
      id,
      imageEmoji: '🏃',
      gifUrl: `https://placehold.co/480x240/f1f5f9/64748b?text=${encodeURIComponent(newEx.name)}+(GIF)`,
      sets: Number(newEx.sets),
      reps: Number(newEx.reps),
      steps: newEx.steps.filter(s => s.trim() !== ''),
    }])
    setNewEx(blankExercise())
    setShowAddForm(false)
  }

  // ─────────────────────────────────────────────────────────

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>Exercise Library</h2>
          <p>Browse all exercises available in the clinic</p>
        </div>
        {role === 'doctor' && (
          <button
            className="btn btn-primary"
            onClick={() => { setShowAddForm(true); setEditingId(null) }}
          >
            + Add Exercise
          </button>
        )}
      </div>

      {/* Add exercise form — doctor only */}
      {showAddForm && role === 'doctor' && (
        <AddExerciseForm
          newEx={newEx}
          onChange={setNewEx}
          onStepChange={updateNewExStep}
          onAddStep={addNewExStep}
          onRemoveStep={removeNewExStep}
          onSave={saveNewExercise}
          onCancel={() => { setShowAddForm(false); setNewEx(blankExercise()) }}
        />
      )}

      <input
        className="search-bar"
        type="text"
        placeholder="Search by name or category (e.g. Knee, Shoulder)..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <div className="empty-state">
          <span>🔍</span>
          No exercises match your search
        </div>
      )}

      <div className="library-grid">
        {filtered.map(ex => (
          <ExerciseCard
            key={ex.id}
            ex={ex}
            role={role}
            isEditing={editingId === ex.id}
            draftSteps={draftSteps}
            onEditSteps={() => startEditSteps(ex)}
            onSaveSteps={() => saveSteps(ex.id)}
            onCancelEdit={cancelEditSteps}
            onDraftStepChange={updateDraftStep}
            onAddDraftStep={addDraftStep}
            onRemoveDraftStep={removeDraftStep}
          />
        ))}
      </div>
    </div>
  )
}

// ── Individual exercise card ──────────────────────────────

function ExerciseCard({
  ex, role, isEditing, draftSteps,
  onEditSteps, onSaveSteps, onCancelEdit,
  onDraftStepChange, onAddDraftStep, onRemoveDraftStep
}) {
  return (
    <div className={`library-card ${isEditing ? 'library-card--editing' : ''}`}>
      {/* GIF / image area */}
      <div className="exercise-gif-wrap">
        <img
          src={ex.gifUrl}
          alt={`${ex.name} demonstration`}
          className="exercise-gif"
        />
        <span className="gif-badge">GIF</span>
      </div>

      <span className="badge grey" style={{ marginBottom: 6, display: 'inline-block' }}>{ex.category}</span>
      <h3 style={{ marginBottom: 6 }}>{ex.name}</h3>
      <p className="desc">{ex.description}</p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <span className="badge blue">{ex.sets} sets</span>
        <span className="badge blue">{ex.reps} reps</span>
      </div>

      <p className="goal-note">✓ {ex.goal}</p>
      <div className="safety-note">⚠ {ex.safetyNote}</div>

      {/* Steps section */}
      <div className="steps-section">
        <div className="steps-heading">How to do it</div>

        {isEditing ? (
          // Edit mode — inputs per step
          <div className="steps-edit">
            {draftSteps.map((step, i) => (
              <div key={i} className="step-input-row">
                <span className="step-num">{i + 1}</span>
                <input
                  className="step-input"
                  value={step}
                  onChange={e => onDraftStepChange(i, e.target.value)}
                  placeholder={`Step ${i + 1}`}
                />
                {draftSteps.length > 1 && (
                  <button className="step-remove-btn" onClick={() => onRemoveDraftStep(i)} title="Remove step">×</button>
                )}
              </div>
            ))}
            <button className="add-step-btn" onClick={onAddDraftStep}>+ Add step</button>
            <div className="steps-edit-actions">
              <button className="btn btn-primary" style={{ fontSize: 13, padding: '7px 14px' }} onClick={onSaveSteps}>Save steps</button>
              <button className="btn btn-ghost" style={{ fontSize: 13, padding: '7px 14px' }} onClick={onCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          // View mode — numbered list
          <>
            <ol className="steps-list">
              {(ex.steps || []).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {role === 'doctor' && (
              <button className="edit-steps-btn" onClick={onEditSteps}>Edit steps</button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── Add exercise form ─────────────────────────────────────

function AddExerciseForm({ newEx, onChange, onStepChange, onAddStep, onRemoveStep, onSave, onCancel }) {
  const field = (key, label, type = 'text', props = {}) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        type={type}
        value={newEx[key]}
        onChange={e => onChange(prev => ({ ...prev, [key]: e.target.value }))}
        {...props}
      />
    </div>
  )

  return (
    <div className="add-exercise-form">
      <div className="add-exercise-form__header">
        <strong>New Exercise</strong>
        <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={onCancel}>Cancel</button>
      </div>

      <div className="form-grid">
        {field('name', 'Exercise name *', 'text', { placeholder: 'e.g. Standing Calf Raise' })}
        {field('category', 'Category', 'text', { placeholder: 'e.g. Knee & Quad' })}
        <div className="form-field">
          <label className="form-label">Sets</label>
          <input className="form-input" type="number" min={1} value={newEx.sets}
            onChange={e => onChange(prev => ({ ...prev, sets: e.target.value }))} />
        </div>
        <div className="form-field">
          <label className="form-label">Reps</label>
          <input className="form-input" type="number" min={1} value={newEx.reps}
            onChange={e => onChange(prev => ({ ...prev, reps: e.target.value }))} />
        </div>
      </div>

      <div className="form-field" style={{ marginTop: 10 }}>
        <label className="form-label">Description</label>
        <textarea className="form-input" rows={2} value={newEx.description}
          placeholder="Brief description of the exercise..."
          onChange={e => onChange(prev => ({ ...prev, description: e.target.value }))} />
      </div>
      <div className="form-field" style={{ marginTop: 10 }}>
        <label className="form-label">Goal</label>
        <input className="form-input" type="text" value={newEx.goal}
          placeholder="What this exercise achieves..."
          onChange={e => onChange(prev => ({ ...prev, goal: e.target.value }))} />
      </div>
      <div className="form-field" style={{ marginTop: 10 }}>
        <label className="form-label">Safety note</label>
        <input className="form-input" type="text" value={newEx.safetyNote}
          placeholder="Who to avoid it for, or signs to stop..."
          onChange={e => onChange(prev => ({ ...prev, safetyNote: e.target.value }))} />
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="form-label" style={{ marginBottom: 8 }}>Steps</div>
        {newEx.steps.map((step, i) => (
          <div key={i} className="step-input-row">
            <span className="step-num">{i + 1}</span>
            <input
              className="step-input"
              value={step}
              onChange={e => onStepChange(i, e.target.value)}
              placeholder={`Step ${i + 1}`}
            />
            {newEx.steps.length > 1 && (
              <button className="step-remove-btn" onClick={() => onRemoveStep(i)} title="Remove">×</button>
            )}
          </div>
        ))}
        <button className="add-step-btn" onClick={onAddStep}>+ Add step</button>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" onClick={onSave}>Save exercise</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default ExerciseLibrary
