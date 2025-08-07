'use client'

export default function Testimonials() {
  return (
    <section className="flex w-full px-[300px] py-[60px] flex-col items-center gap-[60px]">
      <h2 className="text-black text-[40px] font-bold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
        What our users say
      </h2>
      
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-3.5">
          <div className="w-[127px] h-[133px] relative">
            {/* Profile Image */}
            <svg width="125" height="124" viewBox="0 0 125 124" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-2.5">
              <circle cx="62.5" cy="62" r="62" fill="url(#pattern0_5_256)"/>
              <defs>
                <pattern id="pattern0_5_256" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use href="#image0_5_256" transform="translate(-0.25) scale(0.001)"/>
                </pattern>
              </defs>
            </svg>
            
            {/* Quote Icon */}
            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[91px] top-0">
              <circle cx="18.5" cy="18" r="17" fill="black" stroke="white" strokeWidth="2"/>
              <path d="M11.1 23.5C10.1 22.4 9.5 21.2 9.5 19.2C9.5 15.7 12 12.6 15.5 11L16.4 12.3C13.1 14.1 12.4 16.4 12.2 17.9C12.7 17.6 13.4 17.5 14.1 17.6C15.9 17.8 17.3 19.2 17.3 21.1C17.3 22 16.9 22.9 16.3 23.6C15.6 24.3 14.8 24.6 13.8 24.6C12.7 24.6 11.7 24.1 11.1 23.5ZM21.1 23.5C20.1 22.4 19.5 21.2 19.5 19.2C19.5 15.7 22 12.6 25.5 11L26.4 12.3C23.1 14.1 22.4 16.4 22.2 17.9C22.7 17.6 23.4 17.5 24.1 17.6C25.9 17.8 27.3 19.2 27.3 21.1C27.3 22 26.9 22.9 26.3 23.6C25.7 24.3 24.8 24.6 23.8 24.6C22.7 24.6 21.7 24.1 21.1 23.5Z" fill="white"/>
            </svg>
          </div>
          
          <h3 className="text-black text-xl font-semibold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
            Kristin Krause
          </h3>
        </div>
        
        <p className="w-[840px] h-[72px] overflow-hidden text-black text-center text-base font-normal opacity-60 leading-6" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
          Eu id cras morbi consectetur viverra eleifend pellentesque dui. Senectus commodo morbi aliquet eget quis gravida. Ut vel curabitur ut a id tempor. Viverra non commodo vel ac aliquet. Ac euismod tincidunt sed quam pharetra laoreet nisl mollis vitae.
        </p>
        
        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
