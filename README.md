# Road-to-Fit

Place where you get best fitness trainers

# Hono + Drizzle + Turso API

Fast API built with Hono.js, Drizzle ORM and Turso SQLite database, powered by Bun.

## Setup

```bash
# Install dependencies
bun install

# Copy and configure env file
cp .env.example .env

# Start development server
bun run dev

# Run migrations
bun run db:migrate
```

## Environment Variables

```env
TURSO_DB_URL=your_database_url
TURSO_DB_AUTH_TOKEN=your_auth_token
```

## Tech Stack

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- [Hono](https://honojs.dev/) - Web framework
- [Drizzle](https://orm.drizzle.team/) - ORM
- [Turso](https://turso.tech/) - SQLite database

## License

MIT
