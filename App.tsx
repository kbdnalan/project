import { useState } from "react";
import {
  Coins,
  TrendingUp,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { BudgetSimulator } from "./components/BudgetSimulator";
import { Quiz } from "./components/Quiz";

type Screen = "home" | "quiz" | "budget";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [coins, setCoins] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);

  const handleQuizComplete = (score: number) => {
    setCoins(coins + score * 10);
    setCompletedQuizzes(completedQuizzes + 1);
    setScreen("home");
  };

  const handleBudgetComplete = () => {
    setCoins(coins + 50);
    setScreen("home");
  };

  // Домашний экран
  if (screen === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500">
        <div className="mx-auto max-w-md min-h-screen p-6 space-y-6">
          {/* Заголовок */}
          <div className="text-center pt-8 pb-4">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <Coins className="w-12 h-12 text-yellow-300" />
            </div>
            <h1 className="text-white mb-2">ФинансыPRO</h1>
            <p className="text-white/90">
              Учись управлять деньгами играючи!
            </p>
          </div>

          {/* Статистика */}
          <Card className="bg-white/95 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Квизов пройдено
                </p>
                <p className="text-2xl">{completedQuizzes}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Монеты
                </p>
                <p className="text-2xl flex items-center justify-end gap-1">
                  <Coins className="w-5 h-5 text-yellow-600" />
                  {coins}
                </p>
              </div>
            </div>
          </Card>

          {/* Кнопки меню */}
          <div className="space-y-3">
            <Button
              className="w-full h-20 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white justify-start px-6"
              onClick={() => setScreen("quiz")}
            >
              <div className="flex items-center gap-4">
                <BookOpen className="w-8 h-8" />
                <div className="text-left">
                  <div>Квиз по финансам</div>
                  <div className="text-xs text-white/80">
                    Проверь свои знания
                  </div>
                </div>
              </div>
            </Button>

            <Button
              className="w-full h-20 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white justify-start px-6"
              onClick={() => setScreen("budget")}
            >
              <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8" />
                <div className="text-left">
                  <div>Симулятор Бюджета</div>
                  <div className="text-xs text-white/80">
                    Управляй финансами
                  </div>
                </div>
              </div>
            </Button>
          </div>

          {/* Совет */}
          <Card className="bg-white/90 backdrop-blur-sm p-4 border-2 border-yellow-400">
            <p className="text-sm mb-1">💡 Знаешь ли ты?</p>
            <p className="text-xs text-muted-foreground">
              Правило 50/30/20: 50% дохода на нужды, 30% на
              желания, 20% на сбережения!
            </p>
          </Card>
        </div>
      </div>
    );
  }

  // Экран квиза
  if (screen === "quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500">
        <div className="mx-auto max-w-md min-h-screen">
          <div className="bg-white/10 backdrop-blur-sm p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setScreen("home")}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>
          <Quiz onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  // Экран симулятора бюджета
  if (screen === "budget") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500">
        <div className="mx-auto max-w-md min-h-screen">
          <div className="bg-white/10 backdrop-blur-sm p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setScreen("home")}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>
          <BudgetSimulator onComplete={handleBudgetComplete} />
        </div>
      </div>
    );
  }

  return null;
}