// LoginScreen.jsx — The first thing users see.
// For M1 there's no real authentication — just two buttons that set the role.
// In M2+ this would connect to a real auth system (e.g. Supabase Auth or JWTs).

function LoginScreen({ onLogin }) {
  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">🩺</div>
        <h1>PhysioConnect</h1>
        <p>Your physiotherapy clinic, online.</p>

        <div className="login-options">
          <button
            className="login-btn doctor"
            onClick={() => onLogin('doctor')}
          >
            <span>👨‍⚕️</span>
            <span>
              Log in as Doctor
              <span className="btn-sub">View your patients and manage their plans</span>
            </span>
          </button>

          <button
            className="login-btn patient"
            onClick={() => onLogin('patient')}
          >
            <span>🧑‍🦽</span>
            <span>
              Log in as Patient
              <span className="btn-sub">See your exercises and message your doctor</span>
            </span>
          </button>
        </div>

        <p className="login-note">Demo mode — no password needed</p>
      </div>
    </div>
  )
}

export default LoginScreen
