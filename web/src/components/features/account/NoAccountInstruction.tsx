import { Button } from "@/components/ui/button";
import { PlusIcon, UserRoundPlus } from "lucide-react";
import { Link } from "react-router";

export const NoAccountInstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-6xl mb-4">
        {/* Placeholder for Icon */}
        <UserRoundPlus />
      </div>
      <p className="text-lg text-muted-foreground mb-6">
        新增一個使用者以開始使用 Daily Story。
      </p>
      <Link to={`/user`}>
        <Button>
          <PlusIcon />
          新增使用者
        </Button>
      </Link>
    </div>
  );
};
