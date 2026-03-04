// ExerciseLibrary.jsx — A searchable grid of all exercises.
// Used by both doctors (to browse and add to plans) and patients (to learn about exercises).
// The search filters by name and category in real time as you type.
// This is a good example of "controlled input" in React — the search box value is stored
// in state, and the filtered list re-renders automatically when it changes.

import { useState } from 'react'
import { exercises } from '../data/dummy.js'

function ExerciseLibrary() {
  const [search, setSearch] = useState('')

  const filtered = exercises.filter(ex =>
    ex.name.toLowerCase().includes(search.toLowerCase()) ||
    ex.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="page-header">
        <h2>Exercise Library</h2>
        <p>Browse all exercises available in the clinic</p>
      </div>

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
          <div key={ex.id} className="library-card">
            <div style={{ fontSize: 32 }}>{ex.imageEmoji}</div>
            <h3>{ex.name}</h3>
            <span className="badge grey" style={{ marginBottom: 8, display: 'inline-block' }}>{ex.category}</span>
            <p className="desc">{ex.description}</p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <span className="badge blue">{ex.sets} sets</span>
              <span className="badge blue">{ex.reps} reps</span>
            </div>
            <p className="goal-note">✓ {ex.goal}</p>
            <div className="safety-note">⚠ {ex.safetyNote}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExerciseLibrary
