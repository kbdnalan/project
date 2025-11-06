import { useState } from 'react';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface QuizProps {
  onComplete: (score: number) => void;
}

const questions = [
  {
    question: 'Что такое активы?',
    options: [
      'Деньги, которые нужно отдать',
      'То, что приносит вам доход',
      'Ежемесячные расходы',
      'Налоги и сборы'
    ],
    correct: 1,
    explanation: 'Активы - это то, что приносит вам доход или имеет ценность.'
  },
  {
    question: 'Какой процент дохода рекомендуется откладывать?',
    options: ['5-10%', '20-30%', '50%', 'Весь доход'],
    correct: 1,
    explanation: 'Финансовые эксперты рекомендуют откладывать минимум 20% от дохода.'
  },
  {
    question: 'Что такое правило 50/30/20?',
    options: [
      '50% на развлечения, 30% на еду, 20% на жилье',
      '50% на нужды, 30% на желания, 20% на сбережения',
      '50% на долги, 30% на налоги, 20% на себя',
      '50% копить, 30% тратить, 20% инвестировать'
    ],
    correct: 1,
    explanation: 'Правило 50/30/20 - популярный метод бюджетирования.'
  },
  {
    question: 'Что такое "подушка безопасности"?',
    options: [
      'Страховка от несчастных случаев',
      'Резервный фонд на 3-6 месяцев расходов',
      'Дополнительный доход',
      'Кредитная карта'
    ],
    correct: 1,
    explanation: 'Финансовая подушка безопасности - это накопления на 3-6 месяцев жизни.'
  },
  {
    question: 'Что означает термин "инфляция"?',
    options: [
      'Рост цен на товары и услуги',
      'Снижение стоимости валюты',
      'Увеличение зарплат',
      'Банкротство компании'
    ],
    correct: 0,
    explanation: 'Инфляция - это процесс повышения общего уровня цен на товары и услуги.'
  }
];

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const finalScore = score + (selectedAnswer === question.correct ? 1 : 0);
      setScore(finalScore);
      setIsFinished(true);
    }
  };

  // Экран результатов
  if (isFinished) {
    const percentage = (score / questions.length) * 100;

    return (
      <div className="p-4 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full bg-white/95 backdrop-blur-sm p-6 text-center">
          <div className="inline-block bg-yellow-100 rounded-full p-6 mb-4">
            <Trophy className="w-16 h-16 text-yellow-600" />
          </div>
          <h2 className="mb-2">Отлично!</h2>
          <p className="text-muted-foreground mb-6">
            Квиз завершен
          </p>
          
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
            <p className="text-4xl mb-2">{score}/{questions.length}</p>
            <p className="text-sm text-muted-foreground">Правильных ответов</p>
            <div className="mt-4 h-2 bg-white rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm mt-2">
              {percentage >= 80 ? '🏆 Превосходно!' : percentage >= 60 ? '👍 Хорошо!' : '💪 Попробуй еще!'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Coins className="w-6 h-6 text-yellow-600" />
            <span className="text-xl">+{score * 10} монет</span>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={() => onComplete(score)}
          >
            Вернуться домой
          </Button>
        </Card>
      </div>
    );
  }

  // Экран вопросов
  return (
    <div>
      {/* Прогресс */}
      <div className="bg-white/10 backdrop-blur-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white text-sm">Квиз по финансам</h2>
            <p className="text-white/80 text-xs">
              Вопрос {currentQuestion + 1} из {questions.length}
            </p>
          </div>
          <div className="text-white">
            {score}/{questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Вопрос */}
      <div className="p-4 space-y-4">
        <Card className="bg-white/95 backdrop-blur-sm p-6">
          <h3 className="mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-white'
                      : isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">
                <strong>💡 Объяснение:</strong> {question.explanation}
              </p>
            </div>
          )}
        </Card>

        {!showExplanation && (
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Ответить
          </Button>
        )}

        {showExplanation && (
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={handleNext}
          >
            {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
          </Button>
        )}
      </div>
    </div>
  );
}

function Coins({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
    </svg>
  );
}
