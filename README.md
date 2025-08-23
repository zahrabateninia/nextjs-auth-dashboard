# Next.js Auth Dashboard

A simple **Next.js + TypeScript** authentication dashboard project with responsive design, local storage-based login, and user data fetched from the Random User API.

**Live Demo:** [https://nextjs-auth-dashboard-psi.vercel.app/dashboard](https://nextjs-auth-dashboard-psi.vercel.app/dashboard)

---

## Features

* Simple login form with **Iranian mobile number validation** (`09xxxxxxxxx`)
* Fetch random user data from [Random User API](https://randomuser.me/)
* Store user data in **localStorage** for session persistence
* Responsive **dashboard page** showing:

  * User name
  * User email (hidden on small screens)
  * User avatar
  * Logout button
* Reusable UI components: **Input** and **Button**
* Styled with **SCSS Modules** and **CSS variables**
* Clean architecture with **TypeScript types** for user data

---

## Pages

### `/auth` – Login Page

* Enter mobile number and click **Login**
* Fetches random user from API and stores in localStorage
* Redirects to `/dashboard`

### `/dashboard` – Dashboard Page

* Displays welcome message with user’s name
* Shows avatar and email (email hidden on mobile)
* Logout clears localStorage and redirects to `/auth`

---

## Tech Stack

* [Next.js](https://nextjs.org/) (App Router)
* [TypeScript](https://www.typescriptlang.org/)
* [SCSS Modules](https://sass-lang.com/)
* [React Hooks](https://reactjs.org/docs/hooks-intro.html)
* [Next.js Image Component](https://nextjs.org/docs/api-reference/next/image)
* [Vercel](https://vercel.com/) for deployment

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/zahrabateninia/nextjs-auth-dashboard.git
cd nextjs-auth-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project locally.

---

## Build & Deployment

### Build

```bash
npm run build
npm start
```

### Vercel Deployment

* Project is deployed to Vercel: [https://nextjs-auth-dashboard-psi.vercel.app/dashboard](https://nextjs-auth-dashboard-psi.vercel.app/dashboard)
* Make sure `next.config.js` allows external images from `randomuser.me`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "randomuser.me" }
  ],
}
```

---

## Folder Structure

```
src/
├─ components/ui/        # Reusable UI components (Button, Input)
├─ lib/                  # Auth and validation logic
├─ pages/                # Next.js pages (Auth, Dashboard)
├─ styles/               # SCSS modules and global styles
├─ types/                # TypeScript types (user data)
```


