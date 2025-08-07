'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

const destinations = [
  { 
    name: 'Egypt', 
    tours: 5, 
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/fd1a27820777d61d759b98292478ecc690bf4b50?width=768'
  },
  { 
    name: 'USA', 
    tours: 7, 
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4f149475b84ea2ca8d324363311708b7ffb3b95c?width=768'
  },
  { 
    name: 'Turkey', 
    tours: 6, 
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/c7db4c5827622d2310714deb455148951d63dc9c?width=768'
  },
  { 
    name: 'Australia', 
    tours: 7, 
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/3b9ba7893194002471049b00c4136c1e9690491c?width=768'
  },
  { 
    name: 'France', 
    tours: 5, 
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/523b523ee9ab86ad46f93242cce5d9d094f7cd42?width=768'
  },
  { 
    name: 'Greece', 
    tours: 6, 
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/59e32bc5fb2d071bec96a5ea322e79a826edc62a?width=768'
  },
]

export default function PopularDestinations() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="flex w-full px-[120px] py-[60px] flex-col items-center gap-[60px]">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-black text-[40px] font-bold hover:text-teal-600 transition-colors duration-300" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
          Popular Destinations
        </h2>
        <p className="w-[372px] h-[47px] overflow-hidden text-black text-center text-base font-normal opacity-60" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
          Facilisi vulputate malesuada libero vitae fusce placerat dignissim blandit. 
          Duis risus sagittis praesent velit quis egestas. Ac diam nec a amet enim odio id lectus convallis. Lectus nisi nisl suspendisse velit platea faucibus morbi quis facilisis. Mauris a sem ultrices varius. Hendrerit sit aliquet metus facilisis varius sem.
        </p>
        <div className="flex items-center gap-2 group cursor-pointer hover:gap-3 transition-all duration-300">
          <span className="text-black text-base font-semibold group-hover:text-teal-600 transition-colors duration-300" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
            All Destinations
          </span>
          <ArrowRight className="w-3 h-2 text-black opacity-60 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col items-start gap-6">
        {/* First Row */}
        <div className="flex w-[1200px] items-start gap-6">
          {destinations.slice(0, 3).map((destination, index) => (
            <div
              key={index}
              className="h-[248px] flex-1 relative cursor-pointer group overflow-hidden transition-all duration-500 transform hover:scale-105"
              style={{
                borderRadius: '20px',
                backdropFilter: 'blur(12px) saturate(140%)',
                WebkitBackdropFilter: 'blur(12px) saturate(140%)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: hoveredCard === index 
                  ? '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : '0 15px 30px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image with Glass Overlay */}
              <div 
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%), url('${destination.image}') lightgray 50% / cover no-repeat`,
                  borderRadius: '20px'
                }}
              />
              
              {/* Additional Glass Overlay on Hover */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${
                hoveredCard === index ? 'opacity-100' : 'opacity-0'
              }`} style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                borderRadius: '20px'
              }} />
              
              {/* Tour Count Badge */}
              <div 
                className={`flex w-20 h-7 px-3 py-1 justify-center items-center gap-2.5 rounded-lg absolute right-6 top-6 transition-all duration-300 ${
                  hoveredCard === index ? 'bg-teal-600/90 scale-110' : 'bg-black/80'
                }`}
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <span className="text-white text-base font-semibold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  {destination.tours} tours
                </span>
              </div>
              
              {/* Destination Name */}
              <h3 className={`text-white text-[28px] font-bold absolute left-[146px] bottom-[33px] transition-all duration-300 ${
                hoveredCard === index ? 'text-3xl transform translate-y-[-10px]' : ''
              }`} style={{ 
                fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {destination.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="flex w-[1200px] items-start gap-6">
          {destinations.slice(3, 6).map((destination, index) => (
            <div
              key={index + 3}
              className="h-[248px] flex-1 relative cursor-pointer group overflow-hidden transition-all duration-500 transform hover:scale-105"
              style={{
                borderRadius: '20px',
                backdropFilter: 'blur(12px) saturate(140%)',
                WebkitBackdropFilter: 'blur(12px) saturate(140%)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: hoveredCard === index + 3 
                  ? '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : '0 15px 30px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={() => setHoveredCard(index + 3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image with Glass Overlay */}
              <div 
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%), url('${destination.image}') lightgray 50% / cover no-repeat`,
                  borderRadius: '20px'
                }}
              />
              
              {/* Additional Glass Overlay on Hover */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${
                hoveredCard === index + 3 ? 'opacity-100' : 'opacity-0'
              }`} style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                borderRadius: '20px'
              }} />
              
              {/* Tour Count Badge */}
              <div 
                className={`flex w-20 h-7 px-3 py-1 justify-center items-center gap-2.5 rounded-lg absolute right-6 top-6 transition-all duration-300 ${
                  hoveredCard === index + 3 ? 'bg-teal-600/90 scale-110' : 'bg-black/80'
                }`}
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <span className="text-white text-base font-semibold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  {destination.tours} tours
                </span>
              </div>
              
              {/* Destination Name */}
              <h3 className={`text-white text-[28px] font-bold absolute left-[146px] bottom-[33px] transition-all duration-300 ${
                hoveredCard === index + 3 ? 'text-3xl transform translate-y-[-10px]' : ''
              }`} style={{ 
                fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {destination.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
