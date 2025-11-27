import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { RatingScale } from "./RatingScale";
import { TagSelector } from "./TagSelector";
import { AnimatedTextarea } from "./AnimatedTextarea";
import { ParameterRating } from "./ParameterRating";
import { AnonymousFeedback } from "./AnonymousFeedback";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";

interface FormData {
  rating: number | null;
  successTags: string[];
  successText: string;
  gratitudeTags: string[];
  gratitudeText: string;
  improvementTags: string[];
  improvementText: string;
  failuresText: string;
  parameters: Array<{ id: string; name: string; emoji: string; value: number | null }>;
  anonymousFeedback: string;
}

const initialFormData: FormData = {
  rating: null,
  successTags: [],
  successText: "",
  gratitudeTags: [],
  gratitudeText: "",
  improvementTags: [],
  improvementText: "",
  failuresText: "",
  parameters: [
    { id: "motivation", name: "Мотивированность", emoji: "🔥", value: null },
    { id: "speed", name: "Скорость выполнения задач", emoji: "⚡", value: null },
    { id: "quality", name: "Качество решений", emoji: "⭐", value: null },
    { id: "communication", name: "Коммуникация", emoji: "💬", value: null },
    { id: "independence", name: "Самостоятельность", emoji: "🎯", value: null },
    { id: "flexibility", name: "Гибкость", emoji: "🌊", value: null },
    { id: "teamwork", name: "Командность", emoji: "🤝", value: null },
  ],
  anonymousFeedback: "",
};

const successTags = [
  "Достижение целей",
  "Креативность",
  "Лидерство",
  "Проактивность",
  "Внимание к деталям",
  "Аналитика",
  "Решение проблем",
  "Инициативность",
  "Ответственность",
  "Обучаемость",
];

const gratitudeTags = [
  "Поддержка команды",
  "Менторство",
  "Позитивный настрой",
  "Помощь коллегам",
  "Открытость",
  "Эмпатия",
  "Вдохновение",
  "Честность",
  "Доброта",
  "Энергия",
];

const improvementTags = [
  "Тайм-менеджмент",
  "Коммуникация",
  "Делегирование",
  "Планирование",
  "Фокус",
  "Обратная связь",
  "Конфликты",
  "Приоритеты",
  "Документация",
  "Презентации",
];

export const FeedbackWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      console.log("Form submitted:", formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.rating !== null;
      case 1:
        return formData.successTags.length > 0 || formData.successText.length > 0;
      case 2:
        return formData.gratitudeTags.length > 0 || formData.gratitudeText.length > 0;
      case 3:
        return formData.improvementTags.length > 0 || formData.improvementText.length > 0;
      case 4:
        return true; // Optional
      case 5:
        return formData.parameters.some((p) => p.value !== null);
      case 6:
        return true; // Optional
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Оцени общее впечатление
              </h2>
              <p className="text-muted-foreground">Как бы ты оценил работу в целом?</p>
            </div>
            <RatingScale
              value={formData.rating}
              onChange={(value) => setFormData({ ...formData, rating: value })}
            />
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Что получилось отлично? 🌟
              </h2>
              <p className="text-muted-foreground">Выбери до 3 тегов и расскажи подробнее</p>
            </div>
            <TagSelector
              tags={successTags}
              selectedTags={formData.successTags}
              onTagsChange={(tags) => setFormData({ ...formData, successTags: tags })}
            />
            <AnimatedTextarea
              value={formData.successText}
              onChange={(value) => setFormData({ ...formData, successText: value })}
              placeholder="Расскажи о своих успехах. Что получилось особенно хорошо? Чем гордишься?"
              maxLength={1000}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent">
                За что хочется сказать спасибо? 💛
              </h2>
              <p className="text-muted-foreground">Выбери до 3 тегов и расскажи подробнее</p>
            </div>
            <TagSelector
              tags={gratitudeTags}
              selectedTags={formData.gratitudeTags}
              onTagsChange={(tags) => setFormData({ ...formData, gratitudeTags: tags })}
              colors={[
                "from-yellow-400 to-orange-400",
                "from-pink-400 to-rose-400",
                "from-orange-400 to-red-400",
                "from-amber-400 to-yellow-400",
                "from-rose-400 to-pink-400",
                "from-red-400 to-orange-400",
                "from-yellow-500 to-amber-400",
                "from-pink-500 to-rose-400",
                "from-orange-500 to-yellow-400",
                "from-amber-500 to-orange-400",
              ]}
            />
            <AnimatedTextarea
              value={formData.gratitudeText}
              onChange={(value) => setFormData({ ...formData, gratitudeText: value })}
              placeholder="Выр

ази благодарность. Что и кто тебя вдохновили? 🙏✨"
              maxLength={1000}
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Что можно улучшить? 🛠️
              </h2>
              <p className="text-muted-foreground">Выбери до 3 областей для роста</p>
            </div>
            <TagSelector
              tags={improvementTags}
              selectedTags={formData.improvementTags}
              onTagsChange={(tags) => setFormData({ ...formData, improvementTags: tags })}
              colors={[
                "from-blue-500 to-indigo-500",
                "from-purple-500 to-blue-500",
                "from-indigo-500 to-purple-500",
                "from-cyan-500 to-blue-500",
                "from-blue-600 to-cyan-500",
                "from-indigo-600 to-blue-500",
                "from-purple-600 to-indigo-500",
                "from-blue-500 to-purple-500",
                "from-cyan-600 to-indigo-500",
                "from-indigo-500 to-cyan-500",
              ]}
            />
            <AnimatedTextarea
              value={formData.improvementText}
              onChange={(value) => setFormData({ ...formData, improvementText: value })}
              placeholder="Лучшие зоны роста — те, которые ты реально можешь улучшить 📈🎯"
              maxLength={1000}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent">
                Что не получилось? 💬
              </h2>
              <p className="text-muted-foreground">Напиши честно. Это поможет расти</p>
            </div>
            <AnimatedTextarea
              value={formData.failuresText}
              onChange={(value) => setFormData({ ...formData, failuresText: value })}
              placeholder="Расскажи о трудностях и неудачах. Что не сработало? Что бы сделал иначе?"
              maxLength={1000}
              showFormatting={false}
            />
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Оценка по параметрам ⚡
              </h2>
              <p className="text-muted-foreground">Оцени каждый аспект от 1 до 10</p>
            </div>
            <ParameterRating
              parameters={formData.parameters}
              onParametersChange={(parameters) => setFormData({ ...formData, parameters })}
            />
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <AnonymousFeedback
              value={formData.anonymousFeedback}
              onChange={(value) => setFormData({ ...formData, anonymousFeedback: value })}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (showConfetti) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center space-y-6 max-w-2xl"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Готово!
          </h1>
          <p className="text-2xl text-muted-foreground">Ты сделал важное дело ❤️</p>
          <Button
            onClick={() => {
              setShowConfetti(false);
              setCurrentStep(0);
              setFormData(initialFormData);
            }}
            size="lg"
            className="gradient-primary text-lg px-8 py-6"
          >
            Начать заново
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mt-12 gap-4"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Button>

          <div className="text-sm text-muted-foreground">
            Шаг {currentStep + 1} / {totalSteps}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2 gradient-primary"
          >
            {currentStep === totalSteps - 1 ? (
              <>
                Отправить
                <Send className="w-4 h-4" />
              </>
            ) : (
              <>
                Далее
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
