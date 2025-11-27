import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Status = "completed" | "preparation" | "request-feedback" | "open" | "waiting";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string; tooltip: string }> = {
  completed: {
    label: "Завершено",
    className: "bg-success/20 text-success border-success/30",
    tooltip: "Все этапы обратной связи успешно пройдены",
  },
  preparation: {
    label: "Подготовка",
    className: "bg-secondary/20 text-secondary border-secondary/30",
    tooltip: "Идёт этап подготовки к обратной связи",
  },
  "request-feedback": {
    label: "Запросите ОС",
    className: "bg-primary/20 text-primary border-primary/30",
    tooltip: "Необходимо запросить обратную связь у коллег",
  },
  open: {
    label: "Открыто",
    className: "bg-warning/20 text-warning-foreground border-warning/30",
    tooltip: "Ожидается действие от сотрудника",
  },
  waiting: {
    label: "Ожидание",
    className: "bg-muted text-muted-foreground border-border",
    tooltip: "Ожидание следующего этапа или ответов",
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border cursor-help ${config.className}`}
        >
          {config.label}
        </motion.span>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs">
        <p>{config.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
