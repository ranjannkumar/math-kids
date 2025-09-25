// src/components/ResultsScreen.jsx
import React, { useEffect, useContext, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { showShootingStars, clearShootingStars } from '../utils/mathGameLogic';
import { MathGameContext } from '../App.jsx';
import { useNavigate } from 'react-router-dom';

const ResultsScreen = () => {
    const navigate = useNavigate();
    const [leaving, setLeaving] = useState(false);

    const {
        selectedDifficulty,
        selectedTable,
        correctCount,
        setShowResult,
        setTableProgress,
        tableProgress,
        unlockedDegrees,
        setUnlockedDegrees,
        setCompletedBlackBeltDegrees,
    } = useContext(MathGameContext);

    const isBlack = String(selectedDifficulty).startsWith('black');
    const degree = isBlack ? parseInt(String(selectedDifficulty).split('-')[1] || '1', 10) : null;
    const maxQuestions = isBlack ? (degree === 7 ? 30 : 20) : 10;
    const allCorrect = correctCount === maxQuestions;

    // Redirect to WayToGoScreen if the quiz was not perfectly completed
    useEffect(() => {
        if (!allCorrect) {
            navigate('/way-to-go', { replace: true });
        }
    }, [allCorrect, navigate]);

    // Only proceed with the rest of the logic if allCorrect is true
    if (!allCorrect) {
        return null;
    }

    // ---- optional time (read if your game stored it) ----
    const [timeSecs, setTimeSecs] = useState(() => {
        const ls = Number(localStorage.getItem('math-last-session-seconds') || 0);
        return Number.isFinite(ls) ? ls : 0;
    });
    const timeLabel = `${Math.floor(timeSecs)}s`;

    // === Persist completion for COLORED BELTS exactly once ===
    const persistedColoredRef = useRef(false);
    useEffect(() => {
        if (persistedColoredRef.current) return;
        if (!selectedTable || !selectedDifficulty || isBlack) return;
        const levelKey = String(selectedTable);
        const beltKey = String(selectedDifficulty);
        const lsKey = `math-table-progress-${levelKey}-${beltKey}`;
        const alreadyInLS = !!localStorage.getItem(lsKey);
        const alreadyInState = !!(tableProgress?.[levelKey]?.[beltKey]?.completed);
        if (alreadyInLS || alreadyInState) {
            persistedColoredRef.current = true;
            return;
        }
        try { localStorage.setItem(lsKey, allCorrect ? 'perfect' : 'completed'); } catch {}
        setTableProgress((prev = {}) => {
            const prevBelt = prev?.[levelKey]?.[beltKey];
            if (prevBelt?.completed) return prev;
            const levelObj = prev[levelKey] || {};
            return {
                ...prev,
                [levelKey]: {
                    ...levelObj,
                    [beltKey]: { completed: true, perfectPerformance: allCorrect },
                },
            };
        });
        persistedColoredRef.current = true;
    }, [selectedTable, selectedDifficulty, isBlack, allCorrect, setTableProgress, tableProgress]);

    // === Persist completion & unlock NEXT degree for BLACK (per-level) ===
    const persistedBlackRef = useRef(false);
    useEffect(() => {
        if (persistedBlackRef.current) return;
        if (!isBlack || !degree || !selectedTable) return;
        const uKey = `math-l${selectedTable}-unlocked-degrees`;
        const cKey = `math-l${selectedTable}-completed-black-degrees`;
        setCompletedBlackBeltDegrees((prev = []) => {
            const base = Array.isArray(prev) ? prev.slice() : [];
            if (!base.includes(degree)) base.push(degree);
            base.sort((a, b) => a - b);
            try { localStorage.setItem(cKey, JSON.stringify(base)); } catch {}
            return base;
        });
        setUnlockedDegrees((prev = []) => {
            let base = Array.isArray(prev) ? prev.slice() : [];
            if (!base.includes(degree)) base.push(degree);
            const next = degree + 1;
            if (next <= 7 && !base.includes(next)) base.push(next);
            base = Array.from(new Set(base)).sort((a, b) => a - b);
            try { localStorage.setItem(uKey, JSON.stringify(base)); } catch {}
            return base;
        });
        persistedBlackRef.current = true;
    }, [isBlack, degree, selectedTable, setUnlockedDegrees, setCompletedBlackBeltDegrees]);

    // Shooting stars once
    const starsShownRef = useRef(false);
    useEffect(() => {
        if (allCorrect && !starsShownRef.current) {
            starsShownRef.current = true;
            showShootingStars();
        }
        return () => clearShootingStars();
    }, [allCorrect]);

    const beltName = (() => {
        if (isBlack) return `Black (Degree ${degree})`;
        switch (selectedDifficulty) {
            case 'white': return 'White';
            case 'yellow': return 'Yellow';
            case 'green': return 'Green';
            case 'blue': return 'Blue';
            case 'red': return 'Red';
            case 'brown': return 'Brown';
            default: return 'Unknown';
        }
    })();

    useEffect(() => {
    if (isBlack && degree === 7 && allCorrect) {
        // small delay so user sees the celebration
        const t = setTimeout(() => navigate('/levels', { replace: true }), 3000);
        return () => clearTimeout(t);
    }
    }, [isBlack, degree, allCorrect, navigate]);

    const handlePrimary = () => {
        setShowResult(false);
        clearShootingStars();
        setLeaving(true);
         if (isBlack) navigate('/black', { replace: true });
        else if (selectedDifficulty === 'brown') navigate('/black', { replace: true });
        else navigate('/belts', { replace: true });
    };

    if (leaving) return null;
    const pointsEarned = allCorrect ? 10 : Math.max(1, Math.floor(correctCount / 2));
    
    return (
        <div
            className={
                "min-h-screen full-height-safe w-full relative px-3 py-6 flex items-center justify-center"
            }
        >
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={allCorrect ? 280 : 160}
                gravity={0.5}
                recycle={false}
                style={{ position: 'fixed', inset: 0, zIndex: 40, pointerEvents: 'none' }}
            />
            <div className="kid-bg-star star1">★</div>
            <div className="kid-bg-star star2">★</div>
            <div className="kid-bg-star star3">★</div>
            <div className="kid-bg-star star4">★</div>
            <div className="kid-bg-star star5">★</div>
            <div
                className={[
                    "relative z-10 w-full max-w-3xl text-center rounded-3xl shadow-2xl",
                    "bg-white popup-zoom-in animate-pop-in",
                    "p-8 md:p-10"
                ].join(" ")}
            >
                <div
                    className="mx-auto mb-6 rounded-xl px-6 py-3 celebration-animation"
                    style={{
                        maxWidth: 520,
                        background:
                            "linear-gradient(90deg, #8BEC98 0%, #FFB703 100%)",
                        boxShadow: "0 8px 24px rgba(0,0,0,.12)"
                    }}
                >
                    <h2
                        className="m-0 text-3xl md:text-4xl font-extrabold tracking-wide"
                        style={{ letterSpacing: '0.06em', color: '#273444' }}
                    >
                        CONGRATULATIONS
                    </h2>
                </div>
                <p className="text-green-600 font-semibold mb-6">
                    You earned <span className="font-bold">+{pointsEarned}</span> points
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6 justify-center max-w-xl mx-auto mb-8">
                    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 md:p-5 shadow">
                        <div className="text-gray-500 text-sm">Today&apos;s Score</div>
                        <div className="wordart-number mt-1">{correctCount}</div>
                    </div>
                    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 md:p-5 shadow">
                        <div className="text-gray-500 text-sm">Time Spent</div>
                        <div className="wordart-number mt-1">{timeLabel}</div>
                    </div>
                </div>
                <div className="mb-6">
                    <button
                        type="button"
                        className="kid-btn animate-fade-in-up"
                        aria-label="belt-earned"
                    >
                        🎉 Amazing! You got the {beltName} Belt!
                    </button>
                </div>
                <div className="flex justify-center">
                    <button
                        className="px-6 py-3 rounded-2xl bg-gray-900 text-white font-semibold hover:opacity-90 transition"
                        onClick={handlePrimary}
                    >
                        {isBlack ? 'Go to Degrees' : 'Go to Belts'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsScreen;