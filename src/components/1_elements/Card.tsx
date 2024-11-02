import {ReactNode} from "react";
import {cn} from "../../@utils/utils.ts";

type Props = {
    children: ReactNode,
    className?: string
}

export default function Card({children, className}: Props) {
    return (
        <div className={cn("max-w-sm w-full lg:max-w-full rounded-base border-2 text-text border-border dark:border-darkBorder px-3 py-5 text-sm font-base bg-main", className)}>
            {children}
        </div>
    )
}