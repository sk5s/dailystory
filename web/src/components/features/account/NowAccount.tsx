import { cn } from '@/lib/utils';
import React from 'react';
import { useAccountContext } from './AccountContext';
import { Account } from './Account';

interface NowAccountProps {
  imageUrl?: string;
  size?: number;
  onClick?: () => void;
}

const NowAccount: React.FC<NowAccountProps> = ({ 
  size = 8, 
  onClick 
}) => {
  const sizeClass = `w-${size} h-${size}`;
  const { selectedUser } = useAccountContext();

  return (
    <div 
      className={cn(
        sizeClass, 
        'rounded-full', 
        'flex', 
        'items-center', 
        'justify-center', 
        'cursor-pointer', 
        { 'bg-gray-200': !selectedUser }
      )}
      onClick={onClick}
    >
      {!selectedUser ? (
        <span className="text-gray-600 font-bold text-xl w-8">+</span>
      ) : (
        <Account username={selectedUser} selectedUser={""} variant="sm" onClick={() => onClick} />
      )}
    </div>
  );
};

export default NowAccount;
