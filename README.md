# react-use-slots

> A simple React hook for managing \`slot\`-based layout composition using JSX.

## Install

\`\`\`bash
npm install react-use-slots
\`\`\`

## Usage

\`\`\`tsx
import { useSlots } from "react-use-slots";

function MyComponent({ children }) {
  const { slotted, unSlotted } = useSlots<"header" | "footer">(children);

  return (
    <div>
      {slotted.header}
      <main>{unSlotted}</main>
      {slotted.footer}
    </div>
  );
}
\`\`\`

## License

MIT © [Nick Baker](https://github.com/YOUR_USERNAME)

