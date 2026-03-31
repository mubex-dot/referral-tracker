# Referral Tracker

## Description

A backend system that allows generating and tracking referral links for any platform. It provides APIs to create referrals, track clicks, handle conversions, and generate analytics.

## Features

- Generate unique referral links with expiration dates
- Track clicks on referral links
- Mark referrals as converted
- Comprehensive analytics for referrals and overall performance
- Email notifications (via SendGrid)
- RESTful API endpoints

## Tech Stack

- **Backend**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Email Service**: SendGrid
- **Other**: nanoid for unique codes, dotenv for environment variables

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mubex-dot/referral-tracker.git
   cd referral-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/referral_tracker
   SENDGRID_API_KEY=your-sendgrid-api-key
   VERIFIED_SENDER_EMAIL=sendgrid_verified_sender_email
   APP_URL=your_app_url
   ```

   Replace the placeholders with your actual PostgreSQL connection string, SendGrid API key, verified SendGrid sender email and App url.

4. **Set up the database**
   - Ensure PostgreSQL is running and the database exists
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```

## Usage

### Development

```bash
npm run dev
```

This starts the server with hot reloading using `tsx watch`.

### Production

```bash
npm run build
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Base URL

All API endpoints are prefixed with the server URL (e.g., `http://localhost:3000`).

### Health Check

- `GET /` - Returns basic app info
- `GET /health` - Health check endpoint

### Referrals

- `POST /referrals` - Create a new referral
  - Body: `{ referrerEmail: string, targetUrl: string, expiresAt: Date }`
- `GET /referrals` - Get all referrals
- `GET /referrals/redirect/:code` - Redirect to the target URL and track the click
- `POST /referrals/convert` - Mark a referral as converted
  - Body: `{ code: string }`

### Analytics

- `GET /analytics` - Get overall analytics summary
- `GET /analytics/referral` - Get analytics for all referrals
- `GET /analytics/referral/:code` - Get analytics for a specific referral

## Database Schema

### Referral Model

- `id`: String (UUID, primary key)
- `referrerEmail`: String
- `targetUrl`: String
- `code`: String (unique)
- `converted`: Boolean (default: false)
- `clicks`: Click[] (relation)
- `createdAt`: DateTime
- `referralLink`: String
- `convertedAt`: DateTime? (nullable)
- `expiresAt`: DateTime

### Click Model

- `id`: String (UUID, primary key)
- `referralId`: String (foreign key to Referral)
- `createdAt`: DateTime

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server

<!-- ## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (if any)
5. Submit a pull request -->
