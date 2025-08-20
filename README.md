This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Stylist Time Off

The app can block personal time that the stylist is unavailable. In your Airtable base create a table named **`Stylist Time Off`** with the following fields:

| Field        | Type                        | Description                                      |
| ------------ | --------------------------- | ------------------------------------------------ |
| `Date`       | Date                        | Day the stylist is unavailable                   |
| `Start Time` | Single line text            | Beginning of the blocked period (e.g. "1:30 PM") |
| `End Time`   | Single line text            | End of the blocked period (e.g. "3:00 PM")       |
| `Notes`      | Single line text (optional) | Reason or comment                                |

It's fine to use the `Date` field as the table's primary column.

Set the `AIRTABLE_TIME_OFF_TABLE_ID` environment variable to the ID of this table. Any record added here will prevent bookings during the specified times.
