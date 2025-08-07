import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import PopularDestinations from '@/components/PopularDestinations'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SearchBar />
      <PopularDestinations />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  )
} 