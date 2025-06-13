import {
  Children,
  ReactNode,
  ReactElement,
  isValidElement
} from "react";

type SlotChildren = {
  slotted: Record<string, ReactElement>;
  unSlotted: ReactNode[];
};

export const useSlots = (children: ReactNode): SlotChildren => {
  const grouped: SlotChildren = { slotted: {}, unSlotted: [] };

  Children.toArray(children).forEach((child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement<{ slot?: string }>;
      const slot = element.props.slot;
      if (slot) {
        grouped.slotted[slot] = child;
      } else {
        grouped.unSlotted.push(child);
      }
    } else {
      grouped.unSlotted.push(child);
    }
  });

  return grouped;
};

useSlots.displayName = "useSlots";
export default useSlots;
