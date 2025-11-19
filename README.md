# useSlots

A lightweight React hook for slot-based component composition, inspired by Web Components and Vue's slot system.

[![npm version](https://img.shields.io/npm/v/@the-joy-of-lifting/react-use-slots)](https://www.npmjs.com/package/@the-joy-of-lifting/react-use-slots)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Installation

```bash
npm install @the-joy-of-lifting/react-use-slots
```

## Why useSlots?

React's `children` prop is powerful but limited to a single content area. When building flexible layout components, you often need to pass multiple distinct content blocks. The traditional approach uses separate props:

```tsx
<Card
  header={<CardHeader />}
  footer={<CardFooter />}
>
  <CardBody />
</Card>
```

This becomes verbose and cumbersome with multiple content areas. **useSlots** enables a more declarative, HTML-like syntax:

```tsx
<Card>
  <CardHeader slot="header" />
  <CardBody />
  <CardFooter slot="footer" />
</Card>
```

## Quick Start

```tsx
import { useSlots } from '@the-joy-of-lifting/react-use-slots';

function Card({ children }) {
  const { slotted, unSlotted } = useSlots(children);

  return (
    <div className="card">
      <header>{slotted.header}</header>
      <main>{unSlotted}</main>
      <footer>{slotted.footer}</footer>
    </div>
  );
}

// Usage
<Card>
  <h2 slot="header">Dashboard</h2>
  <p>Main content goes here</p>
  <button slot="footer">Save</button>
</Card>
```

## API

```typescript
function useSlots(children: ReactNode): {
  slotted: Record<string, ReactElement>;
  unSlotted: ReactNode[];
}
```

### Returns

- **`slotted`**: Object mapping slot names to their content. Access named slots via `slotted.header`, `slotted.footer`, etc.
- **`unSlotted`**: Array of children without a `slot` prop, typically used for main content.

## TypeScript Support

Type-safe slot names with generics:

```tsx
function Modal({ children }: { children: React.ReactNode }) {
  const { slotted, unSlotted } = useSlots<'title' | 'actions'>(children);

  return (
    <div className="modal">
      <div className="modal-header">{slotted.title}</div>
      <div className="modal-body">{unSlotted}</div>
      <div className="modal-footer">{slotted.actions}</div>
    </div>
  );
}
```

## Examples

### Dashboard Layout

```tsx
function Dashboard({ children }) {
  const { slotted, unSlotted } = useSlots(children);

  return (
    <div className="dashboard">
      <aside className="sidebar">{slotted.sidebar}</aside>
      <main className="content">{unSlotted}</main>
      {slotted.toolbar && (
        <div className="toolbar">{slotted.toolbar}</div>
      )}
    </div>
  );
}

<Dashboard>
  <Navigation slot="sidebar" />
  <Toolbar slot="toolbar" />
  <Content />
</Dashboard>
```

### Dialog Component

```tsx
function Dialog({ children }) {
  const { slotted, unSlotted } = useSlots(children);

  return (
    <div role="dialog">
      {slotted.title && <h2>{slotted.title}</h2>}
      <div className="dialog-content">{unSlotted}</div>
      {slotted.actions && (
        <div className="dialog-actions">{slotted.actions}</div>
      )}
    </div>
  );
}
```

## When to Use Slots

✅ **Good for:**
- Layout components with multiple content areas
- Design system primitives (cards, modals, panels)
- Components with optional regions
- Complex composition patterns

❌ **Not needed for:**
- Simple wrappers with single content area
- Components with few props
- Heavily controlled/data-driven components

## Performance Considerations

`useSlots` processes children on every render. For performance-critical components with many children, consider memoization:

```tsx
const slots = useMemo(() => useSlots(children), [children]);
```

## License

MIT © [Nick Baker](https://github.com/joyoflifting)

## Contributing

Issues and pull requests welcome on [GitHub](https://github.com/joyoflifting/react-use-slots).
