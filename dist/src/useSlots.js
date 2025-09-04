import { Children, isValidElement } from "react";
export const useSlots = (children) => {
    const grouped = { slotted: {}, unSlotted: [] };
    Children.toArray(children).forEach((child) => {
        if (isValidElement(child)) {
            const element = child;
            const slot = element.props.slot;
            if (slot) {
                grouped.slotted[slot] = child;
            }
            else {
                grouped.unSlotted.push(child);
            }
        }
        else {
            grouped.unSlotted.push(child);
        }
    });
    return grouped;
};
useSlots.displayName = "useSlots";
export default useSlots;
