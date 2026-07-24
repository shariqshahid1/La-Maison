# La Maison - Premium Fine Dining Website

A fully professional, modern, and production-ready fine dining restaurant website built with Next.js, featuring premium design, smooth animations, and complete responsiveness across all devices.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)

## Features

### Design & UI
- **Premium Restaurant Design**: Dark slate theme with emerald green accents
- **Fully Responsive**: Mobile-first approach, perfect on all devices
- **Smooth Animations**: Framer Motion powered animations throughout
- **Modern Components**: Cards, modals, forms with hover effects
- **Clean Typography**: Professional spacing and hierarchy
- **Custom SVG Logo**: Elegant house-themed branding

### Pages
1. **Home Page** - Animated hero, featured dishes, testimonials, CTA
2. **Menu Page** - Category filtering, food cards, add to cart
3. **About Page** - Restaurant story, chef profiles, achievements, values
4. **Reservation Page** - Table booking with date/time/guest picker
5. **Contact Page** - Contact form, info cards, Google Maps
6. **Cart & Checkout** - Shopping cart, quantity controls, order summary
7. **Authentication** - Login/Signup with JWT
8. **Admin Dashboard** - Orders, reservations, menu CRUD

### Technical Features
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Zustand** for state management
- **React Hot Toast** for notifications
- **Axios** for API calls

## Project Structure

```
la-maison/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── admin/page.tsx
│   │   ├── api/
│   │   │   ├── auth/ (login, signup, me)
│   │   │   ├── menu/route.ts
│   │   │   ├── orders/route.ts
│   │   │   ├── reservations/route.ts
│   │   │   └── contact/route.ts
│   │   ├── about/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── menu/page.tsx
│   │   ├── reservation/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ClientProviders.tsx
│   │   └── ui/
│   │       ├── Logo.tsx
│   │       ├── MenuCard.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── SkeletonCard.tsx
│   ├── lib/mongodb.ts
│   ├── models/ (User, MenuItem, Order, Reservation, ContactMessage)
│   ├── store/ (cartStore, authStore)
│   └── utils/ (api, jwt)
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- **Node.js** 18+
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. Install dependencies
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/la-maison
   JWT_SECRET=your-super-secret-jwt-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Color Theme

The site uses a premium emerald green accent on dark slate backgrounds:
```css
:root {
  --accent: #10b981;
  --accent-dark: #059669;
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item
- `DELETE /api/menu?id={id}` - Delete menu item

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PATCH /api/orders?id={id}` - Update order
- `DELETE /api/orders?id={id}` - Delete order

### Reservations
- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create reservation
- `DELETE /api/reservations?id={id}` - Delete reservation

### Contact
- `GET /api/contact` - Get all messages
- `POST /api/contact` - Send message
- `DELETE /api/contact?id={id}` - Delete message

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

---

**Built with care for food lovers everywhere**
