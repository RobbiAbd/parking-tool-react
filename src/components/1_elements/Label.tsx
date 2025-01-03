import { ReactNode } from "react";
import { cn } from '../../@utils/utils'

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export default function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block font-medium text-gray-800 mb-1 font-bold', className)}
    >
      {children}
    </label>
  );
}
