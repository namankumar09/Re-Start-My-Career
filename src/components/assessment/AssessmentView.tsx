import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Keyboard
} from 'lucide-react';
import { 
  Question, 
  Segment, 
  SupportedLanguage, 
  AssessmentResult 
} from '../../types';
import { getQuestionBankForSegment } from '../../data/questionBanks';
import { calculateAssessmentResult } from '../../services/assessmentEngine';
import { TRANSLATIONS } from '../../i18n/translations';

interface AssessmentViewProps {
  segment: Segment;
  userId: string;
  initialAnswers?: Record<string, number>;
  initialIndex?: number;
  onSaveAnswer: (questionId: string, value: number, nextIndex: number) => void;
  onComplete: (result: AssessmentResult, answers: Record<string, number>) => void;
  onCancel: () => void;
  language: SupportedLanguage;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  segment,
  userId,
  initialAnswers = {},
  initialIndex = 0,
  onSaveAnswer,
  onComplete,
  onCancel,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const questions: Question[] = getQuestionBankForSegment(segment);

  const [currentIndex, setCurrentIndex] = useState<number>(
    Math.min(initialIndex, questions.length - 1)
  );
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [lowVarianceAlert, setLowVarianceAlert] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];

  // Keyboard shortcut listener (1-5)
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
    { value: 1, label: t.scale_1, shortLabel: '1' },
    { value: 2, label: t.scale_2, shortLabel: '2' },
    { value: 3, label: t.scale_3, shortLabel: '3' },
    { value: 4, label: t.scale_4, shortLabel: '4' },
    { value: 5, label: t.scale_5, shortLabel: '5' },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative">
        
        {/* Low Variance Warning Screen */}
        {lowVarianceAlert ? (
          <div className="text-center py-8 space-y-6 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="font-heading text-2xl font-bold text-zinc-100">
                Non-Differentiated Responses Detected
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {lowVarianceAlert}
              </p>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              To produce an authentic Holland profile and isolate real Latent Gaps, rate statements according to what genuinely excites you versus what does not.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleResetAssessment}
                className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold tracking-tight transition-all flex items-center gap-2"
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
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-200 font-semibold">
                    {t.question_indicator} {currentIndex + 1}
                  </span>
                  <span>{t.of} {questions.length}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                    currentQuestion?.type === 'interest'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800/60'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  }`}>
                    {currentQuestion?.type === 'interest' ? 'Interest (Pull)' : 'Confidence (Self-Belief)'}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    [{currentQuestion?.dimension}]
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text (Large editorial Apple typography) */}
            <div className="py-6 min-h-[140px] flex flex-col justify-center">
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100 leading-snug">
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
                      className={`p-3 sm:p-4 rounded-2xl border text-center transition-all duration-150 flex sm:flex-col items-center justify-between sm:justify-center gap-2 group ${
                        isSelected
                          ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-500/20'
                          : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200'
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
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-400 pt-2">
                <Keyboard className="w-3 h-3 text-zinc-400" />
                <span>{t.keyboard_hint}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-full text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.btn_back}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className={`px-7 py-3 rounded-full text-xs font-semibold tracking-tight transition-all flex items-center gap-2 shadow-sm ${
                  currentAnswer
                    ? 'bg-zinc-100 text-zinc-950 hover:bg-white cursor-pointer'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
                }`}
              >
                <span>
                  {currentIndex === questions.length - 1
                    ? t.btn_submit_assessment
                    : t.btn_next}
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
