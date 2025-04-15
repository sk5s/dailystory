import { cn } from "@/lib/utils";

interface UserProfileProps {
  username: string;
  selectedUser: string | null;
  onClick: () => void;
  variant?: "sm";
  full?: boolean;
}

export const Account: React.FC<UserProfileProps> = ({ username, selectedUser, onClick, variant, full }) => (
  <div
    key={username}
    className={cn(
      "flex flex-col items-center rounded-xl cursor-pointer",
    )}
    onClick={() => onClick()}
  >
    <img
      src={`/images/${username}.svg`}
      alt={`${username}'s profile`}
      className={
        cn(
          "rounded-full aspect-square bg-gradient-to-br from-transparent to-amber-100",
          selectedUser === username ? 'border-black border-2' : '',
          variant == "sm" ? "w-8 h-8" : "w-16 h-16"
        )
      }
      onError={(e) => {
        // Fallback to a default image if profile picture doesn't exist
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${username}&background=random`;
      }}
    />
    {variant != "sm" && (
      <h3 className={
        cn(
          "text-center",
          full ? "" : "truncate w-16",
          selectedUser === username ? 'font-semibold' : ''
        )
      }>{username}</h3>
    )}
  </div>
);