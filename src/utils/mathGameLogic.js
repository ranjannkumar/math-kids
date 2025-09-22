// src/utils/mathGameLogic.js

// ---------- Visual helpers (used by TablePicker) ----------
export const tableBgColors = [
  'bg-yellow-300 border-yellow-400',
  'bg-pink-300 border-pink-400',
  'bg-green-300 border-green-400',
  'bg-orange-300 border-orange-400',
  'bg-purple-300 border-purple-400',
  'bg-amber-300 border-amber-400',
  'bg-lime-300 border-lime-400',
  'bg-blue-300 border-blue-400',
  'bg-rose-300 border-rose-400',
  'bg-cyan-300 border-cyan-400',
  'bg-teal-300 border-teal-400',
  'bg-indigo-300 border-indigo-400',
];

export const showShootingStars = () => {
  console.log('🎆 Shooting stars function called!');
  const leftStarSpeeds = [550, 500, 450, 575, 525];
  const rightStarSpeeds = [550, 500, 450, 575, 525];
  const starColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#96ceb4'];

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.background = starColors[i];
      star.style.filter = `drop-shadow(0 0 15px ${starColors[i]})`;
      star.style.left = '20px';
      star.style.bottom = '20px';
      const speed = leftStarSpeeds[i];
      const duration = 3;
      const customAnimation = `
        @keyframes customShootLeft${i} {
          0% { transform: translate(0, 0) rotate(45deg); opacity: 1; }
          14% { transform: translate(${speed}px, -${speed / 2}px) rotate(45deg); opacity: 1; }
          100% { transform: translate(${speed}px, -${speed / 3}px) rotate(45deg); opacity: 0; }
        }
      `;
      const style = document.createElement('style');
      style.textContent = customAnimation;
      document.head.appendChild(style);
      star.style.animation = `customShootLeft${i} ${duration}s ease-out forwards`;
      const randomDelay = Math.random() * 0.2;
      star.style.animationDelay = i * 0.15 + randomDelay + 's';
      document.body.appendChild(star);
      setTimeout(() => {
        star.parentNode && star.parentNode.removeChild(star);
        style.parentNode && style.parentNode.removeChild(style);
      }, (duration + 1) * 1000);
    }, i * 80);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.background = starColors[i];
      star.style.filter = `drop-shadow(0 0 15px ${starColors[i]})`;
      star.style.right = '20px';
      star.style.bottom = '20px';
      const speed = rightStarSpeeds[i];
      const duration = 3;
      const customAnimation = `
        @keyframes customShootRight${i} {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 1; }
          14% { transform: translate(-${speed}px, -${speed / 2}px) rotate(-45deg); opacity: 1; }
          100% { transform: translate(-${speed}px, -${speed / 3}px) rotate(-45deg); opacity: 0; }
        }
      `;
      const style = document.createElement('style');
      style.textContent = customAnimation;
      document.head.appendChild(style);
      star.style.animation = `customShootRight${i} ${duration}s ease-out forwards`;
      const randomDelay = Math.random() * 0.2;
      star.style.animationDelay = i * 0.15 + randomDelay + 's';
      document.body.appendChild(star);
      setTimeout(() => {
        star.parentNode && star.parentNode.removeChild(star);
        style.parentNode && style.parentNode.removeChild(style);
      }, (duration + 1) * 1000);
    }, i * 80);
  }
};

export const clearShootingStars = () =>
  document.querySelectorAll('.shooting-star').forEach((star) => star.remove());

// ---------- Theme config & age → theme mapping ----------
export const themeConfigs = {
  animals: {
    bg: 'from-green-300 via-yellow-200 to-green-500',
    image: '/animals.jpg',
    tableEmojis: ['🐶', '🐱', '🦁', '🐯', '🐵', '🐸', '🐧', '🐼', '🐨', '🦊', '🐻', '🐰'],
    tableNames: [
      'Dog','Cat','Lion','Tiger','Monkey','Frog','Penguin','Panda','Koala','Fox','Bear','Rabbit'
    ],
    tableColors: [
      'bg-green-400 border-green-600','bg-yellow-300 border-yellow-500','bg-orange-300 border-orange-500',
      'bg-pink-300 border-pink-500','bg-blue-300 border-blue-500','bg-purple-300 border-purple-500',
      'bg-gray-300 border-gray-500','bg-red-300 border-red-500','bg-teal-300 border-teal-600',
      'bg-lime-300 border-lime-500','bg-amber-300 border-amber-500','bg-cyan-300 border-cyan-500'
    ],
  },
  candyland: {
    bg: 'from-pink-200 via-yellow-100 to-pink-400',
    image: '/candyland.jpg',
    tableEmojis: ['🍬', '🍭', '🍫', '🍩', '🍪', '🧁', '🍰', '🍦', '🥧', '🍮', '🍯', '🍨'],
    tableNames: [
      'Candy','Lollipop','Chocolate','Donut','Cookie','Cupcake','Cake','Ice Cream','Pie','Pudding','Honey','Gelato'
    ],
    tableColors: [
      'bg-pink-300 border-pink-500','bg-yellow-200 border-yellow-400','bg-orange-200 border-orange-400',
      'bg-purple-200 border-purple-400','bg-blue-200 border-blue-400','bg-green-200 border-green-400',
      'bg-red-200 border-red-400','bg-amber-200 border-amber-400','bg-lime-200 border-lime-400',
      'bg-cyan-200 border-cyan-400','bg-fuchsia-200 border-fuchsia-400','bg-rose-200 border-rose-400'
    ],
  },
  fairytales: {
    bg: 'from-pink-300 via-purple-200 to-blue-200',
    image: '/fairytales.jpg',
    tableEmojis: ['🧚', '🦄', '🐉', '👸', '🧙', '🧞', '🧜', '🦸', '🧝', '🧟', '🧚', '🦄'],
    tableNames: [
      'Fairy','Unicorn','Dragon','Princess','Wizard','Genie','Mermaid','Hero','Elf','Zombie','Sprite','Pegasus'
    ],
    tableColors: [
      'bg-pink-400 border-pink-600','bg-purple-300 border-purple-500','bg-blue-300 border-blue-500',
      'bg-yellow-300 border-yellow-500','bg-green-300 border-green-500','bg-red-300 border-red-500',
      'bg-orange-300 border-orange-500','bg-cyan-300 border-cyan-500','bg-lime-300 border-lime-500',
      'bg-amber-300 border-amber-500','bg-fuchsia-300 border-fuchsia-500','bg-rose-300 border-rose-400'
    ],
  },
  farm: {
    bg: 'from-yellow-200 via-green-200 to-yellow-400',
    image: '/farm.jpg',
    tableEmojis: ['🐮','🐷','🐔','🐴','🐑','🦆','🦃','🐐','🐓','🐇','🐕','🐈'],
    tableNames: ['Cow','Pig','Chicken','Horse','Sheep','Duck','Turkey','Goat','Rooster','Rabbit','Dog','Cat'],
    tableColors: [
      'bg-yellow-300 border-yellow-500','bg-green-300 border-green-500','bg-orange-300 border-orange-500',
      'bg-pink-300 border-pink-500','bg-blue-300 border-blue-500','bg-purple-300 border-purple-500',
      'bg-gray-300 border-gray-500','bg-red-300 border-red-500','bg-teal-300 border-teal-600',
      'bg-lime-300 border-lime-500','bg-amber-300 border-amber-500','bg-cyan-300 border-cyan-500'
    ],
  },
  dinosaurs: {
    bg: 'from-green-400 via-yellow-200 to-green-700',
    image: '/dinosaur.jpg',
    tableEmojis: ['🦕','🦖','🐊','🐢','🦎','🐍','🦦','🦥','🦨','🦡','🦔','🦋'],
    tableNames: [
      'Brontosaurus','T-Rex','Crocodile','Turtle','Lizard','Snake','Otter','Sloth','Skunk','Badger','Hedgehog','Butterfly'
    ],
    tableColors: [
      'bg-green-500 border-green-700','bg-yellow-400 border-yellow-600','bg-orange-400 border-orange-600',
      'bg-pink-400 border-pink-600','bg-blue-400 border-blue-600','bg-purple-400 border-purple-600',
      'bg-gray-400 border-gray-600','bg-red-400 border-red-600','bg-teal-400 border-teal-600',
      'bg-lime-400 border-lime-600','bg-amber-400 border-amber-600','bg-cyan-400 border-cyan-600'
    ],
  },
  underwater: {
    bg: 'from-blue-200 via-cyan-200 to-blue-400',
    image: '/underwater.jpg',
    tableEmojis: ['🐠','🐟','🐬','🐳','🦈','🦑','🐙','🦀','🦐','🦞','🐡','🐚'],
    tableNames: ['Fish','Goldfish','Dolphin','Whale','Shark','Squid','Octopus','Crab','Shrimp','Lobster','Puffer','Shell'],
    tableColors: [
      'bg-blue-300 border-blue-500','bg-cyan-300 border-cyan-500','bg-teal-300 border-teal-600',
      'bg-green-300 border-green-500','bg-yellow-300 border-yellow-500','bg-purple-300 border-purple-600',
      'bg-gray-300 border-gray-500','bg-red-300 border-red-500','bg-amber-300 border-amber-500',
      'bg-lime-300 border-lime-500','bg-fuchsia-300 border-fuchsia-500','bg-rose-300 border-rose-400'
    ],
  },
};

// Simple age → themes (safe fallback to all)
export const ageThemeMap = (age) => {
  return ['underwater', 'candyland', 'animals', 'farm', 'fairytales', 'dinosaurs'];
};

// ---------- Belt / Level Math-Facts (Addition) ----------
export const specFacts = {
  1: {
    white:  [[0,0], [0,0]],
    yellow: [[0,1], [1,0]],
    green:  [[0,2], [2,0]],
    blue:   [[0,3], [3,0]],
    red:    [[0,4], [4,0]],
    brown:  [[0,5], [5,0]],
  },
  2: {
    white:  [[1,1], [2,0]],
    yellow: [[1,2], [2,1]],
    green:  [[1,3], [3,1]],
    blue:   [[1,4], [4,1]],
    red:    [[2,2], [0,4]],
    brown:  [[2,3], [3,2]],
  },
  3: {
    white:  [[0,6], [6,0]],
    yellow: [[0,7], [7,0]],
    green:  [[0,8], [8,0]],
    blue:   [[9,0], [10,0]],
    red:    [[1,5], [5,1]],
    brown:  [[2,4], [4,2]],
  },
  4: {
    white:  [[1,6], [6,1]],
    yellow: [[1,7], [7,1]],
    green:  [[1,8], [8,1]],
    blue:   [[1,9], [9,1]],
    red:    [[2,4], [4,2]],
    brown:  [[2,5], [5,2]],
  },
  5: {
    white:  [[2,6], [6,2]],
    yellow: [[2,7], [7,2]],
    green:  [[2,8], [8,2]],
    blue:   [[3,3], [4,2]],
    red:    [[3,4], [4,3]],
    brown:  [[3,5], [5,3]],
  },
  6: {
    white:  [[3,6], [6,3]],
    yellow: [[3,7], [7,3]],
    green:  [[4,4], [5,3]],
    blue:   [[4,5], [5,4]],
    red:    [[4,6], [6,4]],
    brown:  [[5,5], [6,4]],
  },
};

// Two facts to INTRODUCE per belt/level
export function getTwoFactsForBelt(level, belt) {
  const L = Math.max(1, Math.min(6, Number(level) || 1));
  const facts = specFacts[L]?.[belt] || specFacts[1].white;
  return facts.slice(0, 2);
}

// Build four NEW questions (two per fact) from the two facts
export function buildFourNewQuestions(level, belt) {
  const pairFacts = getTwoFactsForBelt(level, belt);
  const toQuestion = ([a, b]) => ({
    question: `${a} + ${b}`,
    correctAnswer: a + b,
    answers: shuffleUnique([a + b, a + b + 1, a + b - 1, a + b + 2].filter((n) => n >= 0)),
    tag: 'new',
  });
  const q1 = toQuestion(pairFacts[0]);
  const q2 = toQuestion([pairFacts[0][1], pairFacts[0][0]]);
  const q3 = toQuestion(pairFacts[1]);
  const q4 = toQuestion([pairFacts[1][1], pairFacts[1][0]]);
  return [q1, q2, q3, q4];
}

const beltOrder = ['white', 'yellow', 'green', 'blue', 'red', 'brown'];
function previousBelts(belt) {
  const idx = beltOrder.indexOf(belt);
  if (idx <= 0) return [];
  return beltOrder.slice(0, idx);
}

export function buildSixPreviousQuestions(level, belt) {
  const prevBelts = previousBelts(belt);
  let pool = [];
  if (prevBelts.length === 0) {
    pool = randomBandPool(level);
  } else {
    prevBelts.forEach((b) => {
      const two = getTwoFactsForBelt(level, b);
      two.forEach(([a, c]) => {
        pool.push([a, c], [c, a]);
      });
    });
  }
  const uniq = uniqueStrings(pool.map(([a, b]) => `${a}+${b}`)).map((s) =>
    s.split('+').map(Number)
  );
  const asQuestions = uniq.map(([a, b]) => ({
    question: `${a} + ${b}`,
    correctAnswer: a + b,
    answers: shuffleUnique([a + b, a + b + 1, a + b - 1, a + b + 2].filter((n) => n >= 0)),
    tag: 'review',
  }));
  return pickN(asQuestions, 6);
}

// Generate the FULL 10-question quiz for a belt/level
// src/utils/mathGameLogic.js
// ... (everything you already have above this point stays the same)

// src/utils/mathGameLogic.js
// ... keep everything you already have above ...

// Build the FULL quiz. Supports color belts AND black degrees.
export function buildQuizForBelt(level, belt) {
  if (String(belt).startsWith('black')) {
    const degree = parseInt(String(belt).split('-')[1] || '1', 10);
    return buildQuizForBlack(level, degree);
  }

  const fourNew = buildFourNewQuestions(level, belt);
  const sixPrev = buildSixPreviousQuestions(level, belt);

  // Combine → shuffle → ensure unique by question text → take 10
  const combined = [...fourNew, ...sixPrev].sort(() => Math.random() - 0.5);
  const seen = new Set();
  const unique = [];
  for (const q of combined) {
    if (seen.has(q.question)) continue;
    seen.add(q.question);
    unique.push(q);
    if (unique.length === 10) break;
  }
  while (unique.length < 10) {
    const a = Math.floor(Math.random() * 7);
    const b = Math.floor(Math.random() * 7);
    const key = `${a} + ${b}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({
      question: key,
      correctAnswer: a + b,
      answers: shuffleUnique([a + b, a + b + 1, a + b - 1, a + b + 2].filter((n) => n >= 0)),
      tag: 'pad',
    });
  }
  return unique;
}

// ---------------- Black Belt ----------------
function buildQuizForBlack(level, degree) {
  // Degree 1–6: 20 Qs, Degree 7: 30 Qs, progressively larger addends
  const total = degree === 7 ? 30 : 20;
  const L = Math.max(1, Math.min(6, Number(level) || 1));

  // grow ranges with level/degree (kept kid-friendly but challenging)
  const maxAddend = Math.min(12, 5 + L + Math.ceil(degree * 1.5));
  const minAddend = Math.max(0, Math.floor((degree - 1) / 2));

  const pool = [];
  for (let a = minAddend; a <= maxAddend; a++) {
    for (let b = minAddend; b <= maxAddend; b++) {
      pool.push([a, b]);
      if (pool.length > total * 3) break;
    }
    if (pool.length > total * 3) break;
  }

  // shuffle and build unique questions
  pool.sort(() => Math.random() - 0.5);
  const seen = new Set();
  const questions = [];
  for (const [a, b] of pool) {
    const q = `${a} + ${b}`;
    if (seen.has(q)) continue;
    seen.add(q);
    const ans = a + b;
    const choices = shuffleUnique([ans, ans + 1, Math.max(0, ans - 1), ans + 2]);
    questions.push({ question: q, correctAnswer: ans, answers: choices, tag: 'black' });
    if (questions.length === total) break;
  }

  // Pad if needed
  while (questions.length < total) {
    const a = Math.floor(Math.random() * (maxAddend + 1));
    const b = Math.floor(Math.random() * (maxAddend + 1));
    const q = `${a} + ${b}`;
    if (seen.has(q)) continue;
    seen.add(q);
    const ans = a + b;
    const choices = shuffleUnique([ans, ans + 1, Math.max(0, ans - 1), ans + 2]);
    questions.push({ question: q, correctAnswer: ans, answers: choices, tag: 'black' });
  }

  return questions;
}

export function getLearningModuleContent(belt, level) {
  if (String(belt).startsWith('black')) {
    return 'Black Belt Challenge: Fast addition with bigger numbers!';
  }
  const facts = getTwoFactsForBelt(level, belt);
  const [a, b] = facts[0];
  return `${a} + ${b} = ${a + b}`;
}

// ... keep the rest (themeConfigs, tableBgColors, helpers, etc.) unchanged


// Normalize difficulty keys
export function normalizeDifficulty(diff) {
  if (!diff) return null;
  const basic = ['white', 'yellow', 'green', 'blue', 'red', 'brown'];
  if (basic.includes(diff)) return diff;
  if (String(diff).startsWith('black')) return diff;
  return null;
}

// ---------- Internal utilities ----------
function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  while (copy.length && out.length < n) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}
function shuffleUnique(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function uniqueStrings(arr) {
  return Array.from(new Set(arr));
}
function randomBandPool(level) {
  const L = Math.max(1, Math.min(6, Number(level) || 1));
  const band =
    {
      1: [
        [0, 1],
        [1, 2],
        [2, 1],
        [3, 1],
        [4, 0],
        [2, 2],
      ],
      2: [
        [1, 1],
        [1, 3],
        [2, 2],
        [2, 3],
        [3, 1],
        [4, 1],
      ],
      3: [
        [0, 6],
        [1, 4],
        [2, 3],
        [3, 2],
        [4, 1],
        [5, 1],
      ],
      4: [
        [1, 6],
        [2, 4],
        [3, 3],
        [4, 2],
        [5, 1],
        [1, 9],
      ],
      5: [
        [2, 6],
        [3, 4],
        [4, 3],
        [3, 5],
        [2, 7],
        [2, 8],
      ],
      6: [
        [3, 6],
        [4, 4],
        [4, 5],
        [5, 4],
        [4, 6],
        [5, 5],
      ],
    }[L];
  return band || [
    [0, 1],
    [1, 0],
  ];
}
