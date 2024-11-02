import { ReactNode } from "react";
import { cn } from "../../@utils/utils.ts";

type Props = {
    title?: string; // Optional title prop
    children: ReactNode;
    className?: string;
}

export default function Card({ title, children, className }: Props) {
    return (
        <div className={cn("max-w-sm w-full lg:max-w-full rounded-base border-2 text-text border-border dark:border-darkBorder px-3 py-5 text-sm font-base bg-main", className)}>
            {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>} {/* Title section */}
            {children}
        </div>
    );
}
