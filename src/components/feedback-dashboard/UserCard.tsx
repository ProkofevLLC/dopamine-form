import { motion } from "framer-motion";
import { User } from "@/pages/FeedbackDashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "./StatusBadge";

interface UserCardProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

export const UserCard = ({ user, isSelected, onClick }: UserCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
        isSelected
          ? "bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 shadow-lg"
          : "bg-card hover:bg-muted/50 border-2 border-transparent hover:border-border/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 ring-2 ring-border/50">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm">
            {user.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate text-sm">
              {user.name}
            </h3>
            <span className="text-xs text-muted-foreground shrink-0">
              {user.period}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {user.position}
          </p>
          
          <div className="mt-2">
            <StatusBadge status={user.status} />
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">Прогресс</span>
          <span className="font-medium text-foreground">{user.progress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${user.progress}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`h-full rounded-full ${
              user.progress === 100
                ? "bg-gradient-to-r from-success to-secondary"
                : "bg-gradient-to-r from-primary to-accent"
            }`}
          />
        </div>
      </div>
    </motion.button>
  );
};
