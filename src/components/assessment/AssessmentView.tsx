import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  RotateCcw,
  Keyboard
} from 'lucide-react';
import { 
  Question, 
  Segment, 
  AssessmentResult 
} from '../../types';
import { getQuestionBankForSegment } from '../../data/questionBanks';
import { calculateAssessmentResult } from '../../services/assessmentEngine';

interface AssessmentViewProps {
  segment: Segment;
  userId: string;
  initialAnswers?: Record<string, number>;
  initialIndex?: number;
  onSaveAnswer: (questionId: string, value: number, nextIndex: number) => void;
  onComplete: (result: AssessmentResult, answers: Record<string, number>) => void;
  onCancel: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  segment,
  userId,
  initialAnswers = {},
  initialIndex = 0,
  onSaveAnswer,
  onComplete,
  onCancel,
}) => {
  const questions: Question[] = getQuestionBankForSegment(segment);

  const [currentIndex, setCurrentIndex] = useState<number>(
    Math.min(initialIndex, questions.length - 1)
  );
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [lowVarianceAlert, setLowVarianceAlert] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];

  // Keyboard shortcut listener (1-5, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const val = parseInt(e.key, 10);
        selectAnswer(val);
      } else if (e.key === 'ArrowRight' && currentAnswer) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, answers, currentAnswer]);

  const selectAnswer = (value: number) => {
    if (!currentQuestion) return;
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);
    onSaveAnswer(currentQuestion.id, value, currentIndex);
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      onSaveAnswer(currentQuestion.id, currentAnswer, nextIdx);
    } else {
      // Last question - Evaluate completion & low variance
      const result = calculateAssessmentResult(userId, segment, answers);
      if (result.isLowVariance && result.lowVarianceMessage) {
        setLowVarianceAlert(result.lowVarianceMessage);
      } else {
        onComplete(result, answers);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onCancel();
    }
  };

  const handleResetAssessment = () => {
    setAnswers({});
    setCurrentIndex(0);
    setLowVarianceAlert(null);
  };

  const scaleOptions = [
    { value: 1, label: 'Strongly Disagree', shortLabel: '1' },
    { value: 2, label: 'Disagree', shortLabel: '2' },
    { value: 3, label: 'Neutral', shortLabel: '3' },
    { value: 4, label: 'Agree', shortLabel: '4' },
    { value: 5, label: 'Strongly Agree', shortLabel: '5' },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="w-full max-w-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative">
        
        {/* Low Variance Warning Screen */}
        {lowVarianceAlert ? (
          <div className="text-center py-8 space-y-6 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">
                Non-Differentiated Responses Detected
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {lowVarianceAlert}
              </p>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              To produce an authentic Holland profile and isolate real Latent Gaps, rate statements according to what genuinely excites you versus what does not.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleResetAssessment}
                className="px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white text-xs font-semibold tracking-tight transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Top Bar: Progress, Section Indicators */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold">
                    Question {currentIndex + 1}
                  </span>
                  <span>of {questions.length}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                    currentQuestion?.type === 'interest'
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
                      : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                  }`}>
                    {currentQuestion?.type === 'interest' ? 'Interest (Pull)' : 'Confidence (Execution)'}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                    [{currentQuestion?.dimension}]
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text (Large editorial typography) */}
            <div className="py-6 min-h-[140px] flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 leading-snug">
                {currentQuestion?.text}
              </h2>
            </div>

            {/* 1 - 5 Answer Controls */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {scaleOptions.map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectAnswer(opt.value)}
                      className={`p-3 sm:p-4 rounded-2xl border text-center transition-all duration-150 flex sm:flex-col items-center justify-between sm:justify-center gap-2 group cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white shadow-lg ring-2 ring-zinc-400 dark:ring-zinc-600'
                          : 'bg-white dark:bg-zinc-950/80 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                        isSelected
                          ? 'bg-white text-black dark:bg-black dark:text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 group-hover:text-black dark:group-hover:text-zinc-200'
                      }`}>
                        {opt.shortLabel}
                      </div>
                      <span className="text-[11px] font-medium leading-tight">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Keyboard helper hint */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 pt-2">
                <Keyboard className="w-3 h-3 text-zinc-400" />
                <span>Press 1 to 5, or use arrow keys to navigate</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-full text-xs text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className={`px-7 py-3 rounded-full text-xs font-semibold tracking-tight transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                  currentAnswer
                    ? 'bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white active:scale-[0.98]'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed opacity-60'
                }`}
              >
                <span>
                  {currentIndex === questions.length - 1
                    ? 'Generate Analysis'
                    : 'Next'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
