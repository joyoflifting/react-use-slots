

# @the-joy-of-lifting/use-slots

> A minimal React hook for extracting "slots" from JSX children — inspired by the Web Components and Vue component model.

[![npm](https://img.shields.io/npm/v/@the-joy-of-lifting/react-use-slots)](https://www.npmjs.com/package/@the-joy-of-lifting/react-use-slots)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📦 Install

```bash
npm install @the-joy-of-lifting/use-slots
```
## 🎯 What Are Slots?
Slots are a pattern for named child content injection.

In frameworks like Vue and the Web Components spec, <slot name="header" /> allows you to pass multiple child blocks into a component and address them by name. React doesn’t have a built-in mechanism for this — but it can be emulated using JSX and props.children.

This hook gives you a clean, performant way to group children by a slot prop.

## 💡 Why Use Slots in React?
Traditionally in React, you'd pass content like this:

```tsx
<MyCard
  header={<Header />}
  footer={<Footer />}
>
  <MainContent />
</MyCard>
```
This works, but becomes awkward when:

- You have many children or optional layout regions
- You want declarative usage closer to HTML structure
- You need dynamic composition of content inside a component

With useSlots, you can write:

```tsx
<MyCard>
  <Header slot="header" />
  <MainContent />
  <Footer slot="footer" />
</MyCard>
```
Inside MyCard, you extract these regions:

```tsx
const { slotted, unSlotted } = useSlots(children);
```
And render them like:

```tsx
<div className="card">
  {slotted.header}
  <div className="content">{unSlotted}</div>
  {slotted.footer}
</div>
```
## ✅ Benefits Over Passing Components as Props
Approach	Pros	Cons
Props as elements	Explicit, typed	Verbose, not declarative
children only	Simple for 1 slot	Not scalable to multiple areas
Slots (this)	Declarative, flexible, extensible	Needs a hook / convention

## 🧠 Philosophy
The goal is to allow a more semantic, declarative, and modular component structure without breaking idiomatic React. useSlots keeps your API lean and expressive — especially when building reusable layout primitives or design system components.

This aligns with progressive disclosure and slot-based mental models from HTML/Shadow DOM and design systems like Web Components and Vue.

🧩 API
```ts
function useSlots<T extends string = string>(
  children: ReactNode
): {
  slotted: Record<T, ReactElement>;
  unSlotted: ReactElement[];
}
```
Parameters:
children: JSX children, often from props.children

Returns:
slotted: A map of all children with a slot="..." prop

unSlotted: All children without a slot prop (e.g., content, body)

## 🧪 Example
```tsx
import { useSlots } from "@the-joy-of-lifting/use-slots";

export function Card({ children }: { children: React.ReactNode }) {
  const { slotted, unSlotted } = useSlots<"header" | "footer">(children);

  return (
    <div className="card">
      {slotted.header}
      <main>{unSlotted}</main>
      {slotted.footer}
    </div>
  );
}
```
Usage:

```tsx
<Card>
  <h2 slot="header">Welcome!</h2>
  <p>This is the main content</p>
  <footer slot="footer">© 2025</footer>
</Card>
```

## 📘 Advanced Notes
Slot values must be strings (e.g., slot="header")

You can use TypeScript generics for allowed slot names for better DX

useSlots is not memoized — but can be wrapped in useMemo if needed

You can enforce slot types via a union like: useSlots<'left' | 'right'>(...)

## 🧑‍💻 Author
Made with love by Nick Baker

## 📄 License
MIT — free to use, modify, and distribute.