import { ClassValue } from 'clsx';
import { useState } from 'react';
import { cn } from '../../@utils/utils';

type Props = {
  className?: ClassValue;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ className, children, onClick, type }: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event);
  };

  return (
      <button
          type={type || 'button'}
          aria-label="Click to perform an action"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Reset if mouse leaves while pressed
          onClick={handleClick}
          className={cn(
              'flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all',
              isActive && 'translate-x-boxShadowX translate-y-boxShadowY shadow-none dark:shadow-none', // Styles when clicked
              className
          )}
      >
        {children}
      </button>
  );
}
