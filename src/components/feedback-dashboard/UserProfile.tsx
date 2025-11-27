import { motion } from "framer-motion";
import { User } from "@/pages/FeedbackDashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, TrendingUp } from "lucide-react";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const showAlmostDone = user.progress >= 70 && user.progress < 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-lg mb-6 border border-border/50"
    >
      <div className="flex items-start gap-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <Avatar className="w-20 h-20 ring-4 ring-primary/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl">
              {user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          {user.progress === 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-sm">✓</span>
            </motion.div>
          )}
        </motion.div>

        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
            {showAlmostDone && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1"
              >
                <Badge className="bg-gradient-to-r from-warning to-accent text-warning-foreground border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Почти готово!
                </Badge>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-2 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{user.position}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{user.period}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Общий прогресс</span>
              <span className="font-semibold text-foreground">{user.progress}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full relative overflow-hidden ${
                  user.progress === 100
                    ? "bg-gradient-to-r from-success to-secondary"
                    : "bg-gradient-to-r from-primary to-accent"
                }`}
              >
                {/* Animated shine */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
