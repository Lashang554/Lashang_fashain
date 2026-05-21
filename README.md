# Lashang Fashion

React + Vite fashion e-commerce project.

## Project Folder Structure

```text
Lashang_fashain/
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── THEME_GUIDE.md
├── eslint.config.js
├── netlify.toml
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── Loading.gif
    │   ├── Loading3.webm
    │   ├── Loading4.webm
    │   ├── banner1.jpg
    │   ├── empty-cart.png
    │   └── notfound.json
    ├── components/
    │   ├── Breadcrums.jsx
    │   ├── Carousel.jsx
    │   ├── Category.jsx
    │   ├── Features.jsx
    │   ├── FilterSection.jsx
    │   ├── Footer.jsx
    │   ├── MidBanner.jsx
    │   ├── MobileFilter.jsx
    │   ├── Navbar.jsx
    │   ├── Pagination.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductListView.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── ResponsiveMenu.jsx
    │   ├── ThemeExamples.jsx
    │   └── ThemedScrollToTop.jsx
    ├── context/
    │   ├── CartContext.jsx
    │   └── ThemeContext.jsx
    ├── pages/
    │   ├── About.jsx
    │   ├── BrandProduct.jsx
    │   ├── Cart.jsx
    │   ├── CategoryProduct.jsx
    │   ├── Checkout.jsx
    │   ├── Contact.jsx
    │   ├── Home.jsx
    │   ├── OrderSuccess.jsx
    │   ├── Products.jsx
    │   └── SingleProduct.jsx
    ├── services/
    │   ├── authApi.js
    │   ├── categoryApi.js
    │   └── productApi.js
    ├── store/
    │   └── store.js
    └── styles/
        └── theme.css
```

## Folder Overview

- `public/` contains static files served directly by Vite.
- `src/assets/` contains images, animations, and media files used by the app.
- `src/components/` contains reusable UI components.
- `src/context/` contains React context providers for shared app state.
- `src/pages/` contains route-level page components.
- `src/services/` contains API helper files.
- `src/store/` contains global store configuration.
- `src/styles/` contains shared CSS theme styles.

## Scripts

```bash
npm install
npm run dev
npm run build
```
