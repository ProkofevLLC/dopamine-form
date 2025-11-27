import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserList } from "@/components/feedback-dashboard/UserList";
import { UserProfile } from "@/components/feedback-dashboard/UserProfile";
import { FeedbackTimeline } from "@/components/feedback-dashboard/FeedbackTimeline";
import { SearchBar } from "@/components/feedback-dashboard/SearchBar";
import { EmptyState } from "@/components/feedback-dashboard/EmptyState";
import { FeedbackModal } from "@/components/feedback-dashboard/FeedbackModal";
import { Bell } from "lucide-react";

export interface User {
  id: string;
  name: string;
  avatar: string;
  position: string;
  period: string;
  status: "completed" | "preparation" | "request-feedback" | "open" | "waiting";
  progress: number;
  steps: Step[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  status: "completed" | "active" | "pending" | "locked";
  hasAction?: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Анна Петрова",
    avatar: "https://i.pravatar.cc/150?img=1",
    position: "Product Manager",
    period: "Зима 2025",
    status: "request-feedback",
    progress: 40,
    steps: [
      { id: "1", title: "Подготовка", description: "Фиксирование достижений в течение полугодия", status: "completed" },
      { id: "2", title: "Запросите обратную связь", description: "Выбрать людей, у которых хочешь получить ОС", status: "active", hasAction: true },
      { id: "3", title: "Заполните самоподготовку", description: "Итоги полугодия", status: "pending" },
      { id: "4", title: "Посмотрите обратную связь", description: "Подготовиться к встрече", status: "locked" },
      { id: "5", title: "Встреча с people-менеджером", description: "Итоговый 1-на-1", status: "locked" },
    ],
  },
  {
    id: "2",
    name: "Иван Сидоров",
    avatar: "https://i.pravatar.cc/150?img=3",
    position: "Senior Developer",
    period: "Зима 2025",
    status: "preparation",
    progress: 20,
    steps: [
      { id: "1", title: "Подготовка", description: "Фиксирование достижений в течение полугодия", status: "active", hasAction: true },
      { id: "2", title: "Запросите обратную связь", description: "Выбрать людей, у которых хочешь получить ОС", status: "pending" },
      { id: "3", title: "Заполните самоподготовку", description: "Итоги полугодия", status: "locked" },
      { id: "4", title: "Посмотрите обратную связь", description: "Подготовиться к встрече", status: "locked" },
      { id: "5", title: "Встреча с people-менеджером", description: "Итоговый 1-на-1", status: "locked" },
    ],
  },
  {
    id: "3",
    name: "Мария Козлова",
    avatar: "https://i.pravatar.cc/150?img=5",
    position: "UX Designer",
    period: "Зима 2025",
    status: "completed",
    progress: 100,
    steps: [
      { id: "1", title: "Подготовка", description: "Фиксирование достижений в течение полугодия", status: "completed" },
      { id: "2", title: "Запросите обратную связь", description: "Выбрать людей, у которых хочешь получить ОС", status: "completed" },
      { id: "3", title: "Заполните самоподготовку", description: "Итоги полугодия", status: "completed" },
      { id: "4", title: "Посмотрите обратную связь", description: "Подготовиться к встрече", status: "completed" },
      { id: "5", title: "Встреча с people-менеджером", description: "Итоговый 1-на-1", status: "completed" },
    ],
  },
  {
    id: "4",
    name: "Алексей Николаев",
    avatar: "https://i.pravatar.cc/150?img=8",
    position: "Data Analyst",
    period: "Зима 2025",
    status: "open",
    progress: 60,
    steps: [
      { id: "1", title: "Подготовка", description: "Фиксирование достижений в течение полугодия", status: "completed" },
      { id: "2", title: "Запросите обратную связь", description: "Выбрать людей, у которых хочешь получить ОС", status: "completed" },
      { id: "3", title: "Заполните самоподготовку", description: "Итоги полугодия", status: "active", hasAction: true },
      { id: "4", title: "Посмотрите обратную связь", description: "Подготовиться к встрече", status: "pending" },
      { id: "5", title: "Встреча с people-менеджером", description: "Итоговый 1-на-1", status: "locked" },
    ],
  },
  {
    id: "5",
    name: "Елена Смирнова",
    avatar: "https://i.pravatar.cc/150?img=9",
    position: "HR Manager",
    period: "Зима 2025",
    status: "waiting",
    progress: 80,
    steps: [
      { id: "1", title: "Подготовка", description: "Фиксирование достижений в течение полугодия", status: "completed" },
      { id: "2", title: "Запросите обратную связь", description: "Выбрать людей, у которых хочешь получить ОС", status: "completed" },
      { id: "3", title: "Заполните самоподготовку", description: "Итоги полугодия", status: "completed" },
      { id: "4", title: "Посмотрите обратную связь", description: "Подготовиться к встрече", status: "active" },
      { id: "5", title: "Встреча с people-менеджером", description: "Итоговый 1-на-1", status: "pending" },
    ],
  },
];

const FeedbackDashboard = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStepAction = (stepId: string) => {
    if (stepId === "2") {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen gradient-page">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-card/80 border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ОС-360
          </h1>
          <div className="flex items-center gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl bg-card shadow-md hover:shadow-lg transition-shadow"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                71
              </span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Column - User List */}
        <aside className="w-80 border-r border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/50">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Запросы обратной связи
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <UserList
              users={filteredUsers}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>
        </aside>

        {/* Right Column - Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {selectedUser ? (
              <motion.div
                key={selectedUser.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <UserProfile user={selectedUser} />
                <FeedbackTimeline
                  steps={selectedUser.steps}
                  progress={selectedUser.progress}
                  onStepAction={handleStepAction}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userName={selectedUser?.name}
      />
    </div>
  );
};

export default FeedbackDashboard;
