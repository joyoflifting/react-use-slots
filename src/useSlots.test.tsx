import React from "react";
import { render } from "@testing-library/react";
import useSlots from "./useSlots";

const TestComponent: React.FC<{ children: React.ReactNode; onSlots: (slots: any) => void }> = ({
  children,
  onSlots,
}) => {
  const slots = useSlots(children);
  React.useEffect(() => {
    onSlots(slots);
  }, [slots, onSlots]);
  return null;
};

describe("useSlots", () => {
  it("groups children by slot prop", () => {
    let slots: any = null;
    render(
      <TestComponent onSlots={s => (slots = s)}>
        <div slot="header">Header</div>
        <span>Unslotted</span>
        <div slot="footer">Footer</div>
      </TestComponent>
    );
    expect(Object.keys(slots.slotted)).toEqual(["header", "footer"]);
    expect(slots.unSlotted).toHaveLength(1);
    expect(slots.unSlotted[0].props.children).toBe("Unslotted");
  });

  it("handles no children", () => {
    let slots: any = null;
    render(<TestComponent onSlots={s => (slots = s)} children={null} />);
    expect(slots.slotted).toEqual({});
    expect(slots.unSlotted).toEqual([]);
  });

  it("handles all children without slot", () => {
    let slots: any = null;
    render(
      <TestComponent onSlots={s => (slots = s)}>
        <div>One</div>
        <span>Two</span>
      </TestComponent>
    );
    expect(slots.slotted).toEqual({});
    expect(slots.unSlotted).toHaveLength(2);
    expect(slots.unSlotted[0].props.children).toBe("One");
    expect(slots.unSlotted[1].props.children).toBe("Two");
  });

  it("handles all children with slot", () => {
    let slots: any = null;
    render(
      <TestComponent onSlots={s => (slots = s)}>
        <div slot="a">A</div>
        <span slot="b">B</span>
      </TestComponent>
    );
    expect(Object.keys(slots.slotted)).toEqual(["a", "b"]);
    expect(slots.slotted.a.props.children).toBe("A");
    expect(slots.slotted.b.props.children).toBe("B");
    expect(slots.unSlotted).toHaveLength(0);
  });

  it("handles non-element children (string, number, null, boolean)", () => {
    let slots: any = null;
    render(
      <TestComponent onSlots={s => (slots = s)}>
        {"just a string"}
        {42}
        {null}
        {false}
      </TestComponent>
    );
    expect(slots.slotted).toEqual({});
    expect(slots.unSlotted).toEqual(["just a string", 42]);
  });

  it("handles duplicate slot names (last wins)", () => {
    let slots: any = null;
    render(
      <TestComponent onSlots={s => (slots = s)}>
        <div slot="dup">First</div>
        <div slot="dup">Second</div>
      </TestComponent>
    );
    expect(Object.keys(slots.slotted)).toEqual(["dup"]);
    expect(slots.slotted.dup.props.children).toBe("Second");
  });
});