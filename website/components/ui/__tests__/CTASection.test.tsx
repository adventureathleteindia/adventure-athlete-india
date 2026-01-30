import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CTASection from '../CTASection'

describe('CTASection', () => {
  it('renders the title', () => {
    render(<CTASection />)
    expect(screen.getByText("Can't find what you're looking for?")).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<CTASection />)
    expect(screen.getByText(/I can design a custom adventure/)).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<CTASection />)
    expect(screen.getByRole('link', { name: /Plan Custom Adventure/i })).toBeInTheDocument()
  })

  it('CTA button links to plan page', () => {
    render(<CTASection />)
    expect(screen.getByRole('link', { name: /Plan Custom Adventure/i })).toHaveAttribute('href', '/plan')
  })
})
