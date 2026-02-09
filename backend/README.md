# Real Estate TWA Backend

## Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    TELEGRAM_BOT_TOKEN=your_token_here
    PORT=3001
    DATABASE_URL="file:./dev.db"
    ```

3.  **Database Setup**:
    ```bash
    # Generate Prisma Client
    npx prisma generate

    # Push schema to database
    npx prisma db push

    # Seed the database
    npx ts-node prisma/seed.ts
    ```

4.  **Run the Server**:
    ```bash
    # Development mode
    npm run start:dev

    # Production build
    npm run build
    npm run start:prod
    ```

## API Endpoints

-   `GET /api/projects`: List all projects (supports filtering).
-   `GET /api/projects/:id`: Get project details.
-   `POST /api/leads`: Create a new lead.
-   `GET /api/leads`: List all leads (Protected by Telegram Auth).
-   `GET /api/me`: Get current Telegram user info (Protected).

## Authentication

Protected endpoints require the `Authorization` header containing the Telegram Web App `initData` string.
