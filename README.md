# Passengers Contact App

## Overview

Passengers App have a contacts page to store the phone numbers of their friends and families. This contact app provides:

- A **Contacts List Page** that lists all the passenger's contacts, with a search feature to filter by contact name or phone number.
- A **Contact Details Page** that displays a single contact with more details.
- A **Recent Contacts Feature** that records a visit each time a contact is opened and displays the 4 most recently visited contacts at the top of the list.

## Features

- **Search Contacts**: Quickly find contacts by name or phone number.
- **Recent Contacts**: Displays the last 4 visited contacts for quick access.
- **Client-side Visit Tracking**: Tracks visits to contacts without needing a backend.

## Tech Stack

- **React 19**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Query** for data fetching
- **Zustand** for state management
- **React Router DOM** for navigation
- **Axios** for API calls

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/passengers-app.git
   cd passengers-app
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Run the development server:
   ```sh
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
passengers-app/
├── src/
│   ├── pages/        # Page components (Contacts List, Contact Details)
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API services
│   ├── type/         # Type definitions
│   ├── assets/       # Static assets
│   ├── main.tsx      # App entry point
│   ├── App.tsx       # Main app component
├── public/           # Public assets
├── vite.config.ts    # Vite configuration
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

## Scripts

- **`yarn dev`** - Start development server
- **`yarn build`** - Build for production
- **`yarn preview`** - Preview production build
- **`yarn lint`** - Run ESLint for code quality

## Configuration

### Vite Configuration

This project uses Vite with React support. The `vite.config.ts` includes:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": resolve(__dirname, "src/pages"),
      "@components": resolve(__dirname, "src/components"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@type": resolve(__dirname, "src/type"),
      "@services": resolve(__dirname, "src/services"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
});
```

## Contribution

Feel free to contribute by submitting issues or pull requests!

## Contact

For any inquiries, contact me at [maahjam@gmail.com](mailto:maahjam@gmail.com).

## License

This project is licensed under the MIT License.
