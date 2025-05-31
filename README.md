
# Pinboard - Pinterest-Inspired Image Sharing App

A full-stack, frontend-focused image-sharing and bookmarking application inspired by Pinterest. Built with React, TypeScript, Redux Toolkit, and Tailwind CSS, featuring a simulated backend using localStorage.

## 🌟 Features

### 🔐 Authentication (Simulated)
- User selection from predefined profiles
- Role-based access control (admin/user)
- Persistent login state

### 🎨 User Interface
- **Responsive Design**: Pinterest-style masonry grid layout
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: Powered by Framer Motion
- **Interactive Elements**: Animated like/save buttons and hover effects

### 📌 Core Functionality
- **Pin Management**: Create, edit, delete, and view pins
- **Social Features**: Like and save pins
- **Search & Filter**: Search by title/tags and filter by tag categories
- **User Profiles**: View user profiles with their pins and saved content
- **Admin Panel**: Administrative interface for pin management

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Persistence**: localStorage (simulating backend)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── PinCard.tsx      # Pin display component
│   ├── LikeButton.tsx   # Animated like button
│   ├── SaveButton.tsx   # Animated save button
│   ├── SearchBar.tsx    # Search functionality
│   ├── TagFilterBar.tsx # Tag filtering component
│   ├── PinFormModal.tsx # Pin creation/editing modal
│   └── ThemeToggle.tsx  # Dark/light theme toggle
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Theme management context
├── data/               # Initial data
│   └── initialData.json # User and pin seed data
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── Login.tsx       # User selection page
│   ├── HomeFeed.tsx    # Main feed with all pins
│   ├── PinDetail.tsx   # Detailed pin view
│   ├── Profile.tsx     # User profile page
│   └── AdminPanel.tsx  # Admin management interface
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   │   ├── userSlice.ts    # User state management
│   │   ├── pinSlice.ts     # Pin state management
│   │   └── filterSlice.ts  # Filter state management
│   ├── store.ts        # Store configuration
│   └── hooks.ts        # Typed Redux hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🎮 Usage

### Getting Started
1. **Login**: Select a user profile from the login screen
2. **Explore**: Browse pins on the home feed
3. **Interact**: Like and save pins you enjoy
4. **Search**: Use the search bar to find specific content
5. **Filter**: Click on tag chips to filter by categories

### User Roles

#### Regular User
- View and interact with pins (like/save)
- Access personal profile with uploaded and saved pins
- Search and filter functionality

#### Admin User
- All regular user capabilities
- Create, edit, and delete any pins
- Access to admin panel for bulk management
- Manage all user content

### Theme Toggle
Click the sun/moon icon in the navbar to switch between light and dark themes. Your preference is automatically saved.

## 🔧 Key Features Explained

### State Management
- **Redux Toolkit** for centralized state management
- **Persistent Storage** using localStorage
- **Type Safety** with TypeScript throughout

### Responsive Design
- **Mobile-first** approach
- **Masonry Grid** layout for optimal space usage
- **Adaptive UI** components that work on all screen sizes

### Performance
- **Code Splitting** with React.lazy() for route-based splitting
- **Optimized Bundles** through Vite's build optimization
- **Efficient State Updates** using Redux Toolkit's Immer integration

## 📊 Data Structure

### User Object
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar: string;
  bio: string;
  followers: number;
}
```

### Pin Object
```typescript
interface Pin {
  id: string;
  userId: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  savedBy: number[];
  createdAt: string;
}
```

## 🎨 Customization

### Theme Configuration
Modify `src/index.css` to customize the color scheme:
- CSS custom properties for light/dark themes
- Tailwind CSS classes for component styling

### Adding New Features
1. Create new Redux slices in `src/store/slices/`
2. Add new pages in `src/pages/`
3. Create reusable components in `src/components/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Pinterest** for the design inspiration
- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations
- **Lucide** for the icon set


---

Built using React and TypeScript
```
