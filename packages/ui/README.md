# UI

A shared UI component library for the LinkedIn Content Generator application.

## Components

- Button: A customizable button component with different variants and sizes
- Card: A card component with header, content, and footer sections
- Input: A styled input component

## Usage

```tsx
import { Button, Card, CardHeader, CardContent, Input } from "ui";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <h2>Example Form</h2>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button variant="primary">Submit</Button>
      </CardContent>
    </Card>
  );
}
``` 