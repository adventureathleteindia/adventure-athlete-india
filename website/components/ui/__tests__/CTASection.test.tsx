import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CTASection from '../CTASection'

describe('CTASection', () => {
  it('renders the title', () => {
    render(<CTASection />)
    expect(screen.getByText("Not sure where to start?")).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<CTASection />)
    expect(screen.getByText(/Share your vibe/)).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<CTASection />)
    expect(screen.getByRole('link', { name: /Let's Plan Together/i })).toBeInTheDocument()
  })

  it('CTA button links to plan page', () => {
    render(<CTASection />)
    expect(screen.getByRole('link', { name: /Let's Plan Together/i })).toHaveAttribute('href', '/plan')
  })
})
