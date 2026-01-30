import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WhyAAI from '../WhyAAI'

describe('WhyAAI', () => {
  describe('Section header', () => {
    it('renders section label', () => {
      render(<WhyAAI />)
      expect(screen.getByText('Why Adventure Athlete India')).toBeInTheDocument()
    })

    it('renders section title', () => {
      render(<WhyAAI />)
      expect(screen.getByText(/Not a tour company/)).toBeInTheDocument()
      expect(screen.getByText(/An athlete who guides/)).toBeInTheDocument()
    })
  })

  describe('Value propositions', () => {
    it('renders Local Knowledge point', () => {
      render(<WhyAAI />)
      expect(screen.getByText('Local Knowledge')).toBeInTheDocument()
      expect(screen.getByText(/Trails that aren't on any map/)).toBeInTheDocument()
    })

    it('renders Athlete-Level Guidance point', () => {
      render(<WhyAAI />)
      expect(screen.getByText('Athlete-Level Guidance')).toBeInTheDocument()
      expect(screen.getByText(/5x Nationals competitor/)).toBeInTheDocument()
    })

    it('renders Personal Attention point', () => {
      render(<WhyAAI />)
      expect(screen.getByText('Personal Attention')).toBeInTheDocument()
      expect(screen.getByText(/Just you and me/)).toBeInTheDocument()
    })

    it('renders Licensed & Legit point', () => {
      render(<WhyAAI />)
      expect(screen.getByText('Licensed & Legit')).toBeInTheDocument()
      expect(screen.getByText(/Official HP Tourism Guide/)).toBeInTheDocument()
    })
  })

  describe('CTA button', () => {
    it('renders CTA button', () => {
      render(<WhyAAI />)
      expect(screen.getByRole('link', { name: /Let's Plan Together/i })).toBeInTheDocument()
    })

    it('CTA button links to plan page', () => {
      render(<WhyAAI />)
      expect(screen.getByRole('link', { name: /Let's Plan Together/i })).toHaveAttribute('href', '/plan')
    })
  })

  describe('Image', () => {
    it('renders section image', () => {
      render(<WhyAAI />)
      const image = screen.getByAltText(/Atul Chauhan/i)
      expect(image).toBeInTheDocument()
    })
  })

  describe('Testimonials placeholder', () => {
    it('renders testimonials placeholder', () => {
      render(<WhyAAI />)
      expect(screen.getByText(/Client testimonials coming soon/)).toBeInTheDocument()
    })
  })
})
