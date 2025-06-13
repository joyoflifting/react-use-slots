[![npm](https://img.shields.io/npm/v/@nickbaker/use-slots)](https://www.npmjs.com/package/@nickbaker/use-slots)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

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

