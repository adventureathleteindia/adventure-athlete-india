import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navigation from '../Navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  describe('Logo', () => {
    it('renders the brand logo text', () => {
      render(<Navigation />)
      expect(screen.getByText('Adventure Athlete India')).toBeInTheDocument()
    })

    it('logo links to home page', () => {
      render(<Navigation />)
      const logoLink = screen.getByText('Adventure Athlete India').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })

  describe('Navigation Links', () => {
    it('renders Experiences link', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'Experiences' })).toBeInTheDocument()
    })

    it('renders About link', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    })

    it('renders Contact link', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    })

    it('Experiences link points to /experiences', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'Experiences' })).toHaveAttribute('href', '/experiences')
    })

    it('About link points to /about', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    })

    it('Contact link points to /contact', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    })
  })

  describe('CTA Button', () => {
    it('renders Plan Your Adventure button', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'Plan Your Adventure' })).toBeInTheDocument()
    })

    it('CTA button links to /plan', () => {
      render(<Navigation />)
      expect(screen.getByRole('link', { name: 'Plan Your Adventure' })).toHaveAttribute('href', '/plan')
    })
  })

  describe('Mobile Menu', () => {
    it('renders mobile menu button with accessible label', () => {
      render(<Navigation />)
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('applies solid variant styles by default', () => {
      render(<Navigation />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('bg-white')
    })

    it('applies transparent variant styles when specified', () => {
      render(<Navigation variant="transparent" />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('absolute')
      expect(nav).not.toHaveClass('bg-white')
    })
  })

  describe('Social Icons', () => {
    it('renders Instagram social icon', () => {
      render(<Navigation />)
      expect(screen.getByTitle('Instagram')).toBeInTheDocument()
    })

    it('renders YouTube social icon', () => {
      render(<Navigation />)
      expect(screen.getByTitle('YouTube')).toBeInTheDocument()
    })

    it('renders Strava social icon', () => {
      render(<Navigation />)
      expect(screen.getByTitle('Strava')).toBeInTheDocument()
    })

    it('renders Facebook social icon', () => {
      render(<Navigation />)
      expect(screen.getByTitle('Facebook')).toBeInTheDocument()
    })
  })
})
