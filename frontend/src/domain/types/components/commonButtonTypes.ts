import {ReactNode} from "react";

export interface CommonButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    dataTestId?: string;
}
