import { motion } from "framer-motion";
import { Users, ArrowLeft } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
        >
          <Users className="w-16 h-16 text-primary" />
        </motion.div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          Выберите сотрудника
        </h3>
        <p className="text-muted-foreground mb-6">
          Выберите сотрудника слева, чтобы увидеть прогресс обратной связи и этапы
        </p>

        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center justify-center gap-2 text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Список слева</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
