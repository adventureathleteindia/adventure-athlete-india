import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  describe('Brand Column', () => {
    it('renders brand name', () => {
      render(<Footer />)
      // Brand name appears in both mobile and desktop versions
      const brandNames = screen.getAllByText('Adventure Athlete India')
      expect(brandNames.length).toBeGreaterThanOrEqual(1)
    })

    it('renders tagline', () => {
      render(<Footer />)
      // Tagline appears in both mobile and desktop versions
      const taglines = screen.getAllByText('Experience the raw Himalayas.')
      expect(taglines.length).toBeGreaterThanOrEqual(1)
    })

    it('renders contact information', () => {
      render(<Footer />)
      // Contact info appears in both mobile and desktop versions
      const locations = screen.getAllByText(/Shimla, HP, India/)
      expect(locations.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Social Links', () => {
    it('renders Instagram link', () => {
      render(<Footer />)
      // Social links appear in both mobile and desktop versions
      const instagramLinks = screen.getAllByTitle('Instagram')
      expect(instagramLinks.length).toBeGreaterThanOrEqual(1)
      expect(instagramLinks[0]).toHaveAttribute('href', 'https://instagram.com/adventureathlete.in')
    })

    it('renders Facebook link', () => {
      render(<Footer />)
      const facebookLinks = screen.getAllByTitle('Facebook')
      expect(facebookLinks.length).toBeGreaterThanOrEqual(1)
      expect(facebookLinks[0]).toHaveAttribute('href', 'https://facebook.com/adventureathleteindia')
    })

    it('renders YouTube link', () => {
      render(<Footer />)
      const youtubeLinks = screen.getAllByTitle('YouTube')
      expect(youtubeLinks.length).toBeGreaterThanOrEqual(1)
      expect(youtubeLinks[0]).toHaveAttribute('href', 'https://youtube.com/@adventureathleteindia')
    })

    it('renders Strava link', () => {
      render(<Footer />)
      const stravaLinks = screen.getAllByTitle('Strava')
      expect(stravaLinks.length).toBeGreaterThanOrEqual(1)
      expect(stravaLinks[0]).toHaveAttribute('href', 'https://strava.com/athletes/atulchauhan')
    })

    it('social links open in new tab', () => {
      render(<Footer />)
      const instagramLinks = screen.getAllByTitle('Instagram')
      // Check first instance (representative of all social links)
      expect(instagramLinks[0]).toHaveAttribute('target', '_blank')
      expect(instagramLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Experiences Column', () => {
    it('renders Experiences heading', () => {
      render(<Footer />)
      // Experiences heading appears in both mobile and desktop
      const headings = screen.getAllByText('Experiences')
      expect(headings.length).toBeGreaterThanOrEqual(1)
    })

    it('renders experience types', () => {
      render(<Footer />)
      // Experience types appear in both mobile and desktop versions
      const mtbLinks = screen.getAllByText('Mountain Biking')
      expect(mtbLinks.length).toBeGreaterThanOrEqual(1)
      const roadLinks = screen.getAllByText('Road Cycling')
      expect(roadLinks.length).toBeGreaterThanOrEqual(1)
      const trailLinks = screen.getAllByText('Trail Running')
      expect(trailLinks.length).toBeGreaterThanOrEqual(1)
      const hikingLinks = screen.getAllByText('Hiking')
      expect(hikingLinks.length).toBeGreaterThanOrEqual(1)
      const natureLinks = screen.getAllByText('Nature Walks')
      expect(natureLinks.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('About Column', () => {
    it('renders About heading', () => {
      render(<Footer />)
      // About heading appears in both mobile and desktop
      const headings = screen.getAllByText('About')
      expect(headings.length).toBeGreaterThanOrEqual(1)
    })

    it('renders about links', () => {
      render(<Footer />)
      const aboutMeLinks = screen.getAllByRole('link', { name: 'About Me' })
      expect(aboutMeLinks.length).toBeGreaterThanOrEqual(1)
      expect(aboutMeLinks[0]).toHaveAttribute('href', '/about')

      const whyUsLinks = screen.getAllByRole('link', { name: 'Why Us' })
      expect(whyUsLinks.length).toBeGreaterThanOrEqual(1)
      expect(whyUsLinks[0]).toHaveAttribute('href', '/why-aai')

      const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
      expect(contactLinks.length).toBeGreaterThanOrEqual(1)
      expect(contactLinks[0]).toHaveAttribute('href', '/contact')
    })
  })

  describe('Useful Links Column', () => {
    it('renders Useful Links heading', () => {
      render(<Footer />)
      expect(screen.getByText('Useful Links')).toBeInTheDocument()
    })

    it('renders policy links', () => {
      render(<Footer />)
      const faqLinks = screen.getAllByRole('link', { name: 'FAQ' })
      expect(faqLinks.length).toBeGreaterThanOrEqual(1)
      expect(faqLinks[0]).toHaveAttribute('href', '/faq')

      const termsLinks = screen.getAllByRole('link', { name: 'Terms' })
      expect(termsLinks.length).toBeGreaterThanOrEqual(1)
      expect(termsLinks[0]).toHaveAttribute('href', '/terms')

      const privacyLinks = screen.getAllByRole('link', { name: 'Privacy' })
      expect(privacyLinks.length).toBeGreaterThanOrEqual(1)
      expect(privacyLinks[0]).toHaveAttribute('href', '/privacy')

      const safetyLinks = screen.getAllByRole('link', { name: 'Safety' })
      expect(safetyLinks.length).toBeGreaterThanOrEqual(1)
      expect(safetyLinks[0]).toHaveAttribute('href', '/safety')

      const cancellationLinks = screen.getAllByRole('link', { name: 'Cancellation' })
      expect(cancellationLinks.length).toBeGreaterThanOrEqual(1)
      expect(cancellationLinks[0]).toHaveAttribute('href', '/cancellation')
    })
  })

  describe('Bottom Bar', () => {
    it('renders copyright notice', () => {
      render(<Footer />)
      expect(screen.getByText(/© 2026 Adventure Athlete India/)).toBeInTheDocument()
    })

    it('renders Atul Chauhan attribution', () => {
      render(<Footer />)
      expect(screen.getByText(/Atul Chauhan/)).toBeInTheDocument()
    })

    it('renders HP Tourism license info', () => {
      render(<Footer />)
      expect(screen.getByText(/Licensed HP Tourism Guide/)).toBeInTheDocument()
      expect(screen.getByText(/080724 42383/)).toBeInTheDocument()
    })
  })
})
