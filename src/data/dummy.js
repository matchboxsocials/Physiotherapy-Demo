// dummy.js — All hardcoded data for Milestone 1.
// In Milestone 2 this will be replaced by an Express backend + in-memory store.
// Think of this like a fake database that lives entirely in the browser.

export const exercises = [
  {
    id: 'ex1',
    name: 'Straight Leg Raise',
    category: 'Knee & Quad',
    description: 'Lie on your back with one leg bent and one straight. Tighten your thigh muscle and lift the straight leg to about 45°. Lower slowly.',
    sets: 3,
    reps: 15,
    goal: 'Strengthens the quadriceps without stressing the knee joint',
    safetyNote: 'Stop if you feel sharp knee pain. Keep your core engaged.',
    imageEmoji: '🦵'
  },
  {
    id: 'ex2',
    name: 'Heel Slides',
    category: 'Knee & Quad',
    description: 'Lie on your back. Slowly slide your heel towards your bottom, bending your knee as far as comfortable, then slide back out.',
    sets: 3,
    reps: 20,
    goal: 'Restores range of motion in the knee after injury or surgery',
    safetyNote: 'Do not force beyond a comfortable range. Go slowly.',
    imageEmoji: '🦶'
  },
  {
    id: 'ex3',
    name: 'Clamshells',
    category: 'Hip & Glutes',
    description: 'Lie on your side with knees bent at 45°. Keeping your feet together, rotate your top knee up like a clamshell opening. Lower slowly.',
    sets: 3,
    reps: 15,
    goal: 'Strengthens the hip abductors and glute medius for knee stability',
    safetyNote: 'Keep your hips stacked — do not let your pelvis roll back.',
    imageEmoji: '🦀'
  },
  {
    id: 'ex4',
    name: 'Glute Bridges',
    category: 'Hip & Glutes',
    description: 'Lie on your back with knees bent and feet flat. Press through your heels to lift your hips until your body forms a straight line. Hold 2 seconds, lower slowly.',
    sets: 3,
    reps: 12,
    goal: 'Strengthens glutes and core, improves hip extension',
    safetyNote: 'Do not arch your lower back excessively at the top.',
    imageEmoji: '🌉'
  },
  {
    id: 'ex5',
    name: 'Cat-Cow Stretch',
    category: 'Back & Core',
    description: 'On all fours, alternate between arching your back up (cat) and letting it sag down (cow). Move slowly with your breath.',
    sets: 2,
    reps: 10,
    goal: 'Increases lumbar mobility and relieves back stiffness',
    safetyNote: 'Keep movements gentle and controlled. Never force the range.',
    imageEmoji: '🐱'
  },
  {
    id: 'ex6',
    name: 'Bird Dog',
    category: 'Back & Core',
    description: 'On all fours, simultaneously extend your right arm forward and left leg back. Hold 3 seconds, return, and alternate sides.',
    sets: 3,
    reps: 10,
    goal: 'Builds core stability and balance without loading the spine',
    safetyNote: 'Keep your back flat — do not let your hips rotate or drop.',
    imageEmoji: '🐦'
  },
  {
    id: 'ex7',
    name: 'Shoulder Pendulum',
    category: 'Shoulder',
    description: 'Lean forward with your good arm resting on a table. Let the affected arm hang freely and use gentle body movement to swing it in small circles.',
    sets: 3,
    reps: 20,
    goal: 'Gently restores shoulder range of motion using gravity, not muscle force',
    safetyNote: 'Keep the circles small to start. Stop if you feel sharp pain.',
    imageEmoji: '⏱️'
  },
  {
    id: 'ex8',
    name: 'Wall Slides',
    category: 'Shoulder',
    description: 'Stand with your back against a wall. Place your arms in a W shape against the wall and slowly slide them up to a Y, then back down.',
    sets: 3,
    reps: 12,
    goal: 'Improves shoulder mobility and strengthens the rotator cuff',
    safetyNote: 'Keep your lower back and arms in contact with the wall throughout.',
    imageEmoji: '🧱'
  },
  {
    id: 'ex9',
    name: 'Step-Ups',
    category: 'Knee & Quad',
    description: 'Step up onto a low step with your affected leg, bring the other foot up, then step back down. Lead with the affected leg going up and the good leg going down.',
    sets: 3,
    reps: 10,
    goal: 'Builds functional leg strength and balance for everyday activities',
    safetyNote: 'Use a step no higher than 20cm to start. Hold a wall for balance if needed.',
    imageEmoji: '🪜'
  },
  {
    id: 'ex10',
    name: 'Quad Sets',
    category: 'Knee & Quad',
    description: 'Sit or lie with your leg straight. Press the back of your knee down into the floor/bed, tightening your thigh muscle. Hold 5 seconds, release.',
    sets: 3,
    reps: 15,
    goal: 'Activates and re-educates the quadriceps, especially important post-surgery',
    safetyNote: 'Very gentle — suitable for early stages of recovery.',
    imageEmoji: '💪'
  }
]

export const patients = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    condition: 'Torn ACL — Post-Op Week 6',
    avatar: 'SJ',
    lastActive: '2 hours ago',
    exerciseIds: ['ex1', 'ex2', 'ex3', 'ex4', 'ex9'],
    progress: {
      completionPercent: 74,
      streak: 5,
      doneThisWeek: 4,
      totalThisWeek: 5,
      weeklyHistory: [60, 65, 70, 80, 74]
    }
  },
  {
    id: 'p2',
    name: 'James Okafor',
    condition: 'Chronic Lower Back Pain',
    avatar: 'JO',
    lastActive: 'Yesterday',
    exerciseIds: ['ex5', 'ex6', 'ex4', 'ex10'],
    progress: {
      completionPercent: 88,
      streak: 12,
      doneThisWeek: 4,
      totalThisWeek: 4,
      weeklyHistory: [75, 80, 85, 88, 88]
    }
  },
  {
    id: 'p3',
    name: 'Priya Patel',
    condition: 'Shoulder Impingement — 3 months',
    avatar: 'PP',
    lastActive: '3 days ago',
    exerciseIds: ['ex7', 'ex8', 'ex3'],
    progress: {
      completionPercent: 45,
      streak: 1,
      doneThisWeek: 2,
      totalThisWeek: 3,
      weeklyHistory: [50, 60, 45, 40, 45]
    }
  }
]

// Messages are stored per patient. Each message has a sender: 'doctor' or 'patient'.
export const initialMessages = {
  p1: [
    { id: 'm1', sender: 'patient', text: "Hi Dr. Chen, I finished my exercises today but my knee felt a bit stiff during the heel slides.", timestamp: '10:14 AM' },
    { id: 'm2', sender: 'doctor', text: "Thanks for letting me know, Sarah. A little stiffness at this stage is normal — it usually eases after the first few reps. Try applying a warm compress beforehand next time.", timestamp: '11:32 AM' },
    { id: 'm3', sender: 'patient', text: "That's reassuring! Should I be doing the step-ups yet? They feel a bit scary.", timestamp: '2:05 PM' },
    { id: 'm4', sender: 'doctor', text: "Yes, you're ready for them — just use a very low step (about 10cm) and hold the wall for balance. Don't rush the range of motion.", timestamp: '3:20 PM' }
  ],
  p2: [
    { id: 'm5', sender: 'doctor', text: "James, great consistency this week — 12-day streak! How is the Bird Dog feeling?", timestamp: 'Mon 9:00 AM' },
    { id: 'm6', sender: 'patient', text: "It's getting much easier. The back pain is down from a 7 to about a 4. I think the Cat-Cow is helping a lot.", timestamp: 'Mon 10:30 AM' },
    { id: 'm7', sender: 'doctor', text: "That's excellent progress. Let's add the Glute Bridges to your plan this week — strong glutes take a lot of pressure off the lower back.", timestamp: 'Mon 11:45 AM' }
  ],
  p3: [
    { id: 'm8', sender: 'patient', text: "I haven't been keeping up with my exercises. Life has been busy.", timestamp: 'Wed 7:00 PM' },
    { id: 'm9', sender: 'doctor', text: "I understand, Priya — it happens. Even 5 minutes a day on the pendulum swings makes a real difference. Can you try to squeeze that in before bed?", timestamp: 'Wed 8:15 PM' }
  ]
}

// The doctor in this demo
export const doctor = {
  name: 'Dr. Alex Chen',
  speciality: 'Physiotherapist',
  avatar: 'AC'
}
