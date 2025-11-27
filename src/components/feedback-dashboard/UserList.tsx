import { motion } from "framer-motion";
import { User } from "@/pages/FeedbackDashboard";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const UserList = ({ users, selectedUser, onSelectUser }: UserListProps) => {
  return (
    <div className="p-2 space-y-2">
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <UserCard
            user={user}
            isSelected={selectedUser?.id === user.id}
            onClick={() => onSelectUser(user)}
          />
        </motion.div>
      ))}
    </div>
  );
};
