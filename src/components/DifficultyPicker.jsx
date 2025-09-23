// src/components/DifficultyPicker.jsx
import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { MathGameContext } from '../App.jsx';
import { tableBgColors, themeConfigs } from '../utils/mathGameLogic.js';

const COLOR_BELTS = ['white', 'yellow', 'green', 'blue', 'red', 'brown'];
const beltImages = {
  white: '/judo_white_belt.png',
  yellow: '/judo_yellow_belt.png',
  green: '/judo_green_belt.png',
  blue: '/judo_blue_belt.png',
  red: '/judo_red_belt.png',
  brown: '/judo_brown_belt.png',
  black: '/judo_black_belt.png',
};

const beltPretty = (b) => b.charAt(0).toUpperCase() + b.slice(1);

const BELT_STRIP = {
  white: 'bg-gray-200',
  yellow: 'bg-yellow-400',
  green: 'bg-green-500',
  blue: 'bg-blue-600',
  red: 'bg-red-600',
  brown: 'bg-amber-800',
  black: 'bg-gray-900',
};

function readLSProgress(level, belt) {
  try {
    const raw = localStorage.getItem(`math-table-progress-${level}-${belt}`);
    if (!raw) return null;
    if (raw === 'completed') return { completed: true, perfectPerformance: false };
    if (raw === 'perfect') return { completed: true, perfectPerformance: true };
    const obj = JSON.parse(raw);
    return obj && typeof obj === 'object' ? obj : null;
  } catch {
    return null;
  }
}

const DifficultyPicker = () => {
  const navigate = useNavigate();
  const {
    selectedTable,
    selectedTheme,
    tableProgress,
    startQuizWithDifficulty,
  } = useContext(MathGameContext);

  if (!selectedTable) {
    navigate('/levels');
    return null;
  }

  const unlockedMap = useMemo(() => {
    const lvlKey = String(selectedTable);
    const map = { white: true };
    COLOR_BELTS.forEach((belt, idx) => {
      if (idx === 0) return;
      const prev = COLOR_BELTS[idx - 1];
      const ctxPrev = tableProgress?.[lvlKey]?.[prev];
      const lsPrev = readLSProgress(lvlKey, prev);
      map[belt] = !!(ctxPrev?.completed || lsPrev?.completed);
    });
    const ctxBrown = tableProgress?.[lvlKey]?.brown;
    const lsBrown = readLSProgress(lvlKey, 'brown');
    map.black = !!(ctxBrown?.completed || lsBrown?.completed);
    return map;
  }, [selectedTable, tableProgress]);

  const handlePick = (belt, locked) => {
    if (locked) return;
    if (belt === 'black') navigate('/black');
    else startQuizWithDifficulty(belt);
  };

  const getBeltProgress = (belt) => {
    const lvlKey = String(selectedTable);
    const ctx = tableProgress?.[lvlKey]?.[belt];
    const ls = readLSProgress(lvlKey, belt);
    const hasCompleted = !!(ctx?.completed || ls?.completed);
    const hasPerfect = !!(ctx?.perfectPerformance || ls?.perfectPerformance);
    return { hasCompleted, hasPerfect };
  };

  const Card = ({ belt }) => {
    const locked = !unlockedMap[belt];
    const { hasCompleted } = getBeltProgress(belt);

    // visual-only highlight for White Belt (like the 3000 build)
    const isPrimary = belt === 'white' && !locked;

    return (
      <button
        onClick={() => handlePick(belt, locked)}
        className={[
          'relative rounded-2xl transition-all duration-300 focus:outline-none',
          // base tile look: soft grey with blur and subtle border
          'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg ring-1 ring-black/5',
          // hover/focus
          'hover:shadow-xl hover:ring-black/10',
          // size
          'text-black font-bold',
          // locked dim
          locked ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer',
          // primary (white belt) gets brighter tile
          isPrimary ? 'bg-white shadow-2xl ring-2 ring-white/60' : '',
          // micro scale on hover, like the reference
          !locked ? 'hover:scale-[1.02] active:scale-[0.98]' : '',
        ].join(' ')}
        style={{
          minHeight: 'clamp(120px, 25vh, 180px)',
          width: 'clamp(220px, 26vw, 260px)',
        }}
      >
        {/* top colored strip */}
        <div className={`absolute top-0 left-0 right-0 h-2 ${BELT_STRIP[belt]} rounded-t-2xl`} />

        {/* lock badge */}
        <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full shadow flex items-center justify-center text-[12px] ring-1 ring-black/10">
          {locked ? '🔒' : '🔓'}
        </div>

        {/* content */}
        <div className="flex flex-col items-center justify-center mb-1 sm:mb-2 px-4 py-4 text-gray-900">
          <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
            {beltPretty(belt)} Belt
          </div>

          <div className="flex justify-center mb-1 sm:mb-2">
            <img
              src={beltImages[belt]}
              alt={`${belt} Belt`}
              className="h-6 sm:h-7 md:h-8 w-auto"
              style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
            />
          </div>

          <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
            <span style={{ fontSize: 'clamp(1.4em, 4vw, 1.8em)' }}>
              {hasCompleted ? '⭐' : '☆'}
            </span>
          </div>

          <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap text-gray-700">
            10 Questions
          </div>
        </div>
      </button>
    );
  };

  const BlackCard = () => {
    const locked = !unlockedMap.black;
    return (
      <button
        onClick={() => handlePick('black', locked)}
        className={[
          'relative rounded-2xl transition-all duration-300 focus:outline-none md:col-start-2 lg:col-start-2 justify-self-center',
          'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg ring-1 ring-black/5',
          locked ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        ].join(' ')}
        style={{
          minHeight: 'clamp(120px, 25vh, 180px)',
          width: 'clamp(220px, 26vw, 260px)',
        }}
      >
        <div className={`absolute top-0 left-0 right-0 h-2 ${BELT_STRIP.black} rounded-t-2xl`} />
        <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full shadow flex items-center justify-center text-[12px] ring-1 ring-black/10">
          {locked ? '🔒' : '🔓'}
        </div>

        <div className="flex flex-col items-center justify-center mb-1 sm:mb-2 px-4 py-4 text-gray-900">
          <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2">Black Belt</div>
          <div className="flex justify-center mb-1 sm:mb-2">
            <img
              src={beltImages.black}
              alt="Black Belt"
              className="h-6 sm:h-7 md:h-8 w-auto"
              style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
            />
          </div>
          <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
            <span style={{ fontSize: 'clamp(1.4em, 4vw, 1.8em)' }}>☆</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap text-gray-700">
            Degrees 1–7
          </div>
        </div>
      </button>
    );
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        backgroundImage: "url('/night_sky_landscape.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto w-full relative z-10 px-1 sm:px-2 md:px-4">
        {/* back button */}
        <div className="flex items-center justify-between mb-4">
          <button
            className="fixed z-50 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg border border-white/40 focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.5rem)',
              top: 'max(env(safe-area-inset-top), 0.5rem)',
              left: 'max(env(safe-area-inset-left), 0.5rem)',
            }}
            onClick={() => navigate('/levels')}
            aria-label="Back"
            title="Back"
          >
            <FaArrowLeft size={24} />
          </button>
        </div>

        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center drop-shadow-lg">
          Level {selectedTable}
        </div>

        {/* grid like the 3000 app */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-6 sm:gap-x-8 md:gap-x-10">
          {COLOR_BELTS.map((b) => (
            <Card key={b} belt={b} />
          ))}
          <BlackCard />
        </div>
      </div>
    </div>
  );
};

export default DifficultyPicker;
