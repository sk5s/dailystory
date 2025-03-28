import clsx from "clsx";

interface UserProfileProps {
  username: string;
  selectedUser: string | null;
  onClick: () => void;
}

export const Account: React.FC<UserProfileProps> = ({ username, selectedUser, onClick }) => (
  <div
    key={username}
    className={clsx(
      "flex flex-col items-center rounded-xl",
    )}
    onClick={() => onClick()}
  >
    <img
      src={`/images/${username}.svg`}
      alt={`${username}'s profile`}
      className={
        clsx(
          "rounded-full",
          selectedUser === username ? 'border border-black' : ''
        )
      }
      onError={(e) => {
        // Fallback to a default image if profile picture doesn't exist
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${username}&background=random`;
      }}
    />
    <h3 className={
      clsx(
        "",
        selectedUser === username ? 'font-semibold' : ''
      )
    }>{username}</h3>
  </div>
);