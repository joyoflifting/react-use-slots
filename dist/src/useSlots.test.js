import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { render } from "@testing-library/react";
import useSlots from "./useSlots";
const TestComponent = ({ children, onSlots, }) => {
    const slots = useSlots(children);
    React.useEffect(() => {
        onSlots(slots);
    }, [slots, onSlots]);
    return null;
};
describe("useSlots", () => {
    it("groups children by slot prop", () => {
        let slots = null;
        render(_jsxs(TestComponent, { onSlots: s => (slots = s), children: [_jsx("div", { slot: "header", children: "Header" }), _jsx("span", { children: "Unslotted" }), _jsx("div", { slot: "footer", children: "Footer" })] }));
        expect(Object.keys(slots.slotted)).toEqual(["header", "footer"]);
        expect(slots.unSlotted).toHaveLength(1);
        expect(slots.unSlotted[0].props.children).toBe("Unslotted");
    });
    it("handles no children", () => {
        let slots = null;
        render(_jsx(TestComponent, { onSlots: s => (slots = s), children: null }));
        expect(slots.slotted).toEqual({});
        expect(slots.unSlotted).toEqual([]);
    });
    it("handles all children without slot", () => {
        let slots = null;
        render(_jsxs(TestComponent, { onSlots: s => (slots = s), children: [_jsx("div", { children: "One" }), _jsx("span", { children: "Two" })] }));
        expect(slots.slotted).toEqual({});
        expect(slots.unSlotted).toHaveLength(2);
        expect(slots.unSlotted[0].props.children).toBe("One");
        expect(slots.unSlotted[1].props.children).toBe("Two");
    });
    it("handles all children with slot", () => {
        let slots = null;
        render(_jsxs(TestComponent, { onSlots: s => (slots = s), children: [_jsx("div", { slot: "a", children: "A" }), _jsx("span", { slot: "b", children: "B" })] }));
        expect(Object.keys(slots.slotted)).toEqual(["a", "b"]);
        expect(slots.slotted.a.props.children).toBe("A");
        expect(slots.slotted.b.props.children).toBe("B");
        expect(slots.unSlotted).toHaveLength(0);
    });
    it("handles non-element children (string, number, null, boolean)", () => {
        let slots = null;
        render(_jsxs(TestComponent, { onSlots: s => (slots = s), children: ["just a string", 42, null, false] }));
        expect(slots.slotted).toEqual({});
        expect(slots.unSlotted).toEqual(["just a string", 42]);
    });
    it("handles duplicate slot names (last wins)", () => {
        let slots = null;
        render(_jsxs(TestComponent, { onSlots: s => (slots = s), children: [_jsx("div", { slot: "dup", children: "First" }), _jsx("div", { slot: "dup", children: "Second" })] }));
        expect(Object.keys(slots.slotted)).toEqual(["dup"]);
        expect(slots.slotted.dup.props.children).toBe("Second");
    });
});
