/**
 * THEME USAGE EXAMPLES
 * 
 * This file demonstrates how to use the color system in your components.
 * Copy these patterns into your actual components.
 */

import { useTheme } from '../context/ThemeContext'

// ============================================
// EXAMPLE 1: Product Card
// ============================================
export const ProductCardExample = ({ product }) => {
  return (
    <div className="card-theme rounded-xl p-4 hover:shadow-lg transition-all">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full rounded-lg mb-3" 
      />
      <h3 className="text-theme-primary font-semibold line-clamp-2">
        {product.title}
      </h3>
      <p className="text-primary-500 font-bold text-lg mt-1">
        ${product.price}
      </p>
      <button className="btn-primary w-full mt-3 py-2 rounded-md font-semibold">
        Add to Cart
      </button>
    </div>
  )
}

// ============================================
// EXAMPLE 2: Form Input
// ============================================
export const FormInputExample = () => {
  return (
    <div className="space-y-2">
      <label className="text-theme-primary font-medium block">
        Full Name
      </label>
      <input 
        type="text"
        className="input-theme w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-primary-500"
        placeholder="Enter your name"
      />
    </div>
  )
}

// ============================================
// EXAMPLE 3: Page Container
// ============================================
export const PageContainerExample = ({ children }) => {
  return (
    <div className="bg-theme min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}

// ============================================
// EXAMPLE 4: Card with Multiple Elements
// ============================================
export const InfoCardExample = ({ title, description, action }) => {
  return (
    <div className="card-theme rounded-lg p-6">
      <h2 className="text-theme-primary text-xl font-bold mb-2">
        {title}
      </h2>
      <p className="text-theme-secondary mb-4">
        {description}
      </p>
      <div className="flex gap-3">
        <button className="btn-primary px-6 py-2 rounded-md">
          {action}
        </button>
        <button className="btn-secondary px-6 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  )
}

// ============================================
// EXAMPLE 5: Theme Toggle Button
// ============================================
export const ThemeToggleExample = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="bg-surface border border-theme rounded-md px-4 py-2 text-theme-primary hover:bg-surface-hover transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <span>☀️ Light Mode</span>
      ) : (
        <span>🌙 Dark Mode</span>
      )}
    </button>
  )
}

// ============================================
// EXAMPLE 6: Using CSS Variables Directly
// ============================================
export const DirectVariableExample = () => {
  return (
    <div 
      className="rounded-lg p-6"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)'
      }}
    >
      <h3>Using CSS Variables Directly</h3>
      <p className="text-[var(--color-text-secondary)]">
        This approach gives you full control
      </p>
    </div>
  )
}

// ============================================
// EXAMPLE 7: Status Messages
// ============================================
export const StatusMessageExample = ({ type, message }) => {
  const colors = {
    success: 'text-[var(--color-success)] bg-green-50 dark:bg-green-900/20',
    error: 'text-[var(--color-error)] bg-red-50 dark:bg-red-900/20',
    warning: 'text-[var(--color-warning)] bg-yellow-50 dark:bg-yellow-900/20',
    info: 'text-[var(--color-info)] bg-blue-50 dark:bg-blue-900/20',
  }
  
  return (
    <div className={`${colors[type]} rounded-md p-4 border border-current/20`}>
      <p className="font-medium">{message}</p>
    </div>
  )
}

// ============================================
// EXAMPLE 8: Navigation Link
// ============================================
export const NavLinkExample = ({ to, children, isActive }) => {
  return (
    <a
      href={to}
      className={`
        px-4 py-2 rounded-md transition-colors
        ${isActive 
          ? 'bg-primary-500 text-white' 
          : 'text-theme-primary hover:bg-surface'
        }
      `}
    >
      {children}
    </a>
  )
}

