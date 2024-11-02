import {ReactNode} from "react";
import { cn } from '../../@utils/utils'
import Card from "../1_elements/Card.tsx";

type Props = {
    children: ReactNode;
    className?: string;
};

export default function MainLayout({children, className} : Props) {
    return(
        <div className={cn("container mx-auto py-4", className)}>
            <Card>
                {children}
            </Card>
        </div>
    )
}