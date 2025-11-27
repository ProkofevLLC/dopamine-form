import { motion } from "framer-motion";
import { Shield, Eye, EyeOff } from "lucide-react";
import { AnimatedTextarea } from "./AnimatedTextarea";

interface AnonymousFeedbackProps {
  value: string;
  onChange: (value: string) => void;
}

export const AnonymousFeedback = ({ value, onChange }: AnonymousFeedbackProps) => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 border-2 border-primary/30"
      >
        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(270 70% 60%) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(330 80% 65%) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(270 70% 60%) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Инкогнито режим</h2>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <EyeOff className="w-12 h-12 text-accent" />
            </motion.div>
          </div>

          <p className="text-center text-slate-300 text-lg">
            Хочешь добавить что-то анонимно? Никто не узнает, от кого это.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-primary/20">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-slate-300 text-sm">
                Твоё имя не будет привязано к этому фидбеку
              </span>
            </div>

            <div className="relative">
              {/* Noise/grain effect */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none rounded-xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              
              <div className="relative">
                <AnimatedTextarea
                  value={value}
                  onChange={onChange}
                  placeholder="Пиши честно. Это увидят без имени. Никто не узнает, от кого это. 🤐"
                  maxLength={1000}
                  showFormatting={false}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-xs text-slate-400"
            >
              <Shield className="w-4 h-4" />
              <span>Защищено end-to-end шифрованием</span>
            </motion.div>
          </div>
        </div>

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: [
              "0 0 20px hsl(270 70% 60% / 0.3)",
              "0 0 40px hsl(330 80% 65% / 0.5)",
              "0 0 20px hsl(270 70% 60% / 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};
