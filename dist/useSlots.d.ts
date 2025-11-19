import { ReactNode, ReactElement } from "react";
type SlotChildren = {
    slotted: Record<string, ReactElement>;
    unSlotted: ReactNode[];
};
export declare const useSlots: {
    (children: ReactNode): SlotChildren;
    displayName: string;
};
export default useSlots;
