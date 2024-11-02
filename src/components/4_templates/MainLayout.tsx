import {ReactNode} from "react";
import { cn } from '../../@utils/utils'
import Card from "../1_elements/Card.tsx";
import Marquee from "../1_elements/Marquee.tsx";

type Props = {
    children: ReactNode;
    className?: string;
};

const motorPricing = [
    "1 Jam: Rp 2000",
    "2 Jam: Rp 4000",
    "Lebih dari 2 Jam: Rp 6000"
];

const mobilPricing = [
    "1 Jam: Rp 4000",
    "2 Jam: Rp 6000",
    "Lebih dari 2 Jam: Rp 10000"
];

const items = [
    "Motor:",
    ...motorPricing,
    "Mobil:",
    ...mobilPricing
];

export default function MainLayout({children, className} : Props) {
    return(
        <>
            <Marquee items={items} />
            <div className={cn("container mx-auto py-4", className)}>
                <Card>
                    {children}
                </Card>
            </div>
            <Marquee items={items} />
        </>
    )
}