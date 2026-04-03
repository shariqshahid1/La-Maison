# 🍽️ La Cucina - Premium Restaurant Website

A fully professional, modern, and production-ready restaurant website built with Next.js, featuring premium design, smooth animations, and complete responsiveness across all devices.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)

## ✨ Features

### 🎨 Design & UI
- **Premium Restaurant Design**: Dark theme with warm gold accents
- **Fully Responsive**: Mobile-first approach, perfect on all devices
- **Smooth Animations**: Framer Motion powered animations throughout
- **Modern Components**: Cards, modals, forms with hover effects
- **Clean Typography**: Professional spacing and hierarchy

### 🚀 Pages
1. **Home Page**
   - Animated hero section with parallax effect
   - Featured dishes showcase
   - Customer testimonials slider
   - About section with stats
   - Call-to-action sections

2. **Menu Page**
   - Category filtering system
   - Beautiful food cards with animations
   - Add to cart functionality
   - Hover effects and transitions

3. **About Page**
   - Restaurant story section
   - Chef profiles
   - Achievements & stats
   - Core values showcase

4. **Reservation Page**
   - Table booking form
   - Date & time selection
   - Guest count picker
   - Special requests field

5. **Contact Page**
   - Contact form with validation
   - Google Maps integration
   - Contact information cards
   - Social media links

6. **Cart & Checkout**
   - Shopping cart management
   - Quantity controls
   - Order summary
   - Checkout form

7. **Authentication**
   - Login page
   - Signup page
   - JWT-based authentication
   - Protected routes

8. **Admin Dashboard**
   - Overview statistics
   - Order management
   - Reservation management
   - Menu CRUD operations

### 🛠️ Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Zustand** for state management
- **React Hot Toast** for notifications
- **Axios** for API calls
- **Form Validation** on all forms

## 📁 Project Structure

```
restaurant-website/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── signup/route.ts
│   │   │   │   └── me/route.ts
│   │   │   ├── menu/route.ts
│   │   │   ├── orders/route.ts
│   │   │   ├── reservations/route.ts
│   │   │   └── contact/route.ts
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── reservation/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── MenuCard.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── SkeletonCard.tsx
│   ├── lib/
│   │   └── mongodb.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── MenuItem.ts
│   │   ├── Order.ts
│   │   ├── Reservation.ts
│   │   └── ContactMessage.ts
│   ├── store/
│   │   ├── cartStore.ts
│   │   └── authStore.ts
│   └── utils/
│       ├── api.ts
│       └── jwt.ts
├── public/
│   └── images/
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (https://nodejs.org/)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Navigate to project directory**
   ```bash
   cd restaurant-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/restaurant
   
   # JWT Secret (Change this to a secure random string)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   
   If running MongoDB locally:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas (cloud):
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Update `MONGODB_URI` in `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors
Edit `globals.css` to change the color scheme:
```css
:root {
  --gold: #f59e0b;
  --gold-dark: #d97706;
}
```

### Restaurant Information
- Update restaurant name in `Navbar.tsx` and `Footer.tsx`
- Modify contact information in `Footer.tsx` and `Contact` page
- Change images by replacing URLs with your own

### Menu Items
Update the sample menu data in `src/app/menu/page.tsx` or connect to your database API

### Adding Admin User
To create an admin user, you can:
1. Sign up normally through the UI
2. Update the user's role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large screens**: > 1280px

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation on all forms
- Secure API endpoints

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- **Netlify**: Similar to Vercel
- **AWS/GCP/Azure**: Deploy as Node.js app
- **MongoDB Atlas**: For database hosting

## 📊 API Endpoints

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

## 🎯 Future Enhancements

- [ ] Online payment integration (Stripe/PayPal)
- [ ] Email notifications for orders
- [ ] Image upload for menu items
- [ ] Advanced menu search
- [ ] User order history
- [ ] Reviews and ratings
- [ ] Multi-language support
- [ ] SEO optimization with sitemap
- [ ] PWA capabilities

## 📦 Dependencies

```json
{
  "next": "latest",
  "react": "latest",
  "react-dom": "latest",
  "framer-motion": "latest",
  "mongoose": "latest",
  "bcryptjs": "latest",
  "jsonwebtoken": "latest",
  "axios": "latest",
  "react-icons": "latest",
  "zustand": "latest",
  "react-hot-toast": "latest"
}
```

## 🤝 Support

For issues or questions:
1. Check this README
2. Review error logs in console
3. Ensure MongoDB is running
4. Verify environment variables are set

## 📝 License

This project is open source and available for personal and commercial use.

## 🎉 Credits

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather)
- **Database**: MongoDB
- **Images**: Unsplash (for demo purposes)

---

**Built with ❤️ for food lovers everywhere**

*Enjoy your culinary journey with La Cucina!* 🍕🍝🍷
