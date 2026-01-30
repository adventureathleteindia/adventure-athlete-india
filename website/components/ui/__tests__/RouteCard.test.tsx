import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RouteCard from '../RouteCard'

const mockRoute = {
  title: 'Kuppar Peak Loop',
  category: 'Mountain Biking',
  image: 'https://example.com/image.jpg',
  href: '/experience/kuppar-peak',
  distance: '32 km',
  elevation: '1200m',
  difficulty: 'Hard',
  duration: '4-5 hrs',
}

describe('RouteCard', () => {
  describe('Basic rendering', () => {
    it('renders route title', () => {
      render(<RouteCard {...mockRoute} />)
      expect(screen.getByText('Kuppar Peak Loop')).toBeInTheDocument()
    })

    it('renders route category', () => {
      render(<RouteCard {...mockRoute} />)
      expect(screen.getByText('Mountain Biking')).toBeInTheDocument()
    })

    it('renders route image with alt text', () => {
      render(<RouteCard {...mockRoute} />)
      const image = screen.getByAltText('Kuppar Peak Loop')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('example.com'))
    })

    it('links to the route detail page', () => {
      render(<RouteCard {...mockRoute} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/experience/kuppar-peak')
    })
  })

  describe('Route metadata', () => {
    it('renders distance', () => {
      render(<RouteCard {...mockRoute} />)
      expect(screen.getByText('32 km')).toBeInTheDocument()
    })

    it('renders elevation', () => {
      render(<RouteCard {...mockRoute} />)
      expect(screen.getByText('1200m')).toBeInTheDocument()
    })

    it('renders difficulty level', () => {
      render(<RouteCard {...mockRoute} />)
      expect(screen.getByText('Hard')).toBeInTheDocument()
    })

    it('renders duration', () => {
      render(<RouteCard {...mockRoute} />)
      expect(screen.getByText('4-5 hrs')).toBeInTheDocument()
    })
  })

  describe('Compact variant', () => {
    it('hides metadata when compact is true', () => {
      render(<RouteCard {...mockRoute} compact />)
      expect(screen.queryByText('32 km')).not.toBeInTheDocument()
      expect(screen.queryByText('1200m')).not.toBeInTheDocument()
    })

    it('still shows title and category in compact mode', () => {
      render(<RouteCard {...mockRoute} compact />)
      expect(screen.getByText('Kuppar Peak Loop')).toBeInTheDocument()
      expect(screen.getByText('Mountain Biking')).toBeInTheDocument()
    })
  })
})
