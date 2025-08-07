'use client'

import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center">
      {/* Banner Image */}
      <img 
        src="https://api.builder.io/api/v1/image/assets/TEMP/59b0e37ede2732c824b79b34579fcff22b42d0c5?width=2880" 
        alt="Banner" 
        className="w-full h-[139px]"
      />
      
      {/* Footer Content */}
      <div className="flex w-full px-[120px] py-[60px] pb-5 flex-col items-center gap-[60px] bg-white">
        <div className="flex flex-col items-center gap-[60px]">
          <div className="flex w-[1200px] justify-between items-start">
            {/* Logo + Text + Social Icons */}
            <div className="flex flex-col items-start gap-5">
              <div className="flex items-center gap-2">
                <span className="text-black text-2xl font-bold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  Travel Agency
                </span>
                <svg width="32" height="25" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_5_323)">
                    <path d="M31.9876 3.26562L28.5746 7.66516L29.878 11.4367L31.9876 3.26562Z" fill="url(#paint0_linear_5_323)"/>
                    <path d="M32 3.26172L27.2676 6.22009L23.6113 4.57471L32 3.26172Z" fill="url(#paint1_linear_5_323)"/>
                    <path d="M6.74142 22.3505C8.76363 23.7531 11.1714 24.5038 13.6378 24.5006C20.3101 24.5006 25.7192 19.1284 25.7192 12.5003C25.7183 11.7644 25.6496 11.0301 25.5142 10.3066C22.1648 14.7816 14.0379 24.2988 6.74142 22.3505Z" fill="url(#paint2_linear_5_323)"/>
                    <path d="M25.0273 8.49509C24.1934 6.15681 22.6505 4.13261 20.611 2.70091C18.5715 1.2692 16.1355 0.500313 13.6381 0.5C6.96583 0.5 1.55739 5.87217 1.55739 12.4997C1.55649 13.4115 1.66006 14.3205 1.86609 15.2091C0.951096 15.3483 -0.0015564 14.4247 -0.0015564 14.4247C0.572673 15.4985 1.42036 16.404 2.45693 17.0507L2.46928 17.082C2.87109 17.3213 3.29167 17.528 3.72693 17.7002C4.29311 17.9305 4.88418 18.0951 5.48839 18.1908C9.65833 18.9083 15.8984 17.0433 25.0273 8.49509Z" fill="url(#paint3_radial_5_323)"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_5_323" x1="28.5746" y1="7.35118" x2="31.9876" y2="7.35118" gradientUnits="userSpaceOnUse">
                      <stop/>
                      <stop offset="0.71"/>
                      <stop offset="0.99"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_5_323" x1="23.6113" y1="4.74091" x2="32" y2="4.74091" gradientUnits="userSpaceOnUse">
                      <stop/>
                      <stop offset="0.65"/>
                      <stop offset="0.99"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_5_323" x1="6.74142" y1="17.4033" x2="25.7192" y2="17.4033" gradientUnits="userSpaceOnUse">
                      <stop offset="0.01"/>
                      <stop offset="0.57"/>
                      <stop offset="1"/>
                    </linearGradient>
                    <radialGradient id="paint3_radial_5_323" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.79609 9.7762) scale(22.663 22.511)">
                      <stop offset="0.01"/>
                      <stop offset="0.35"/>
                      <stop offset="1"/>
                    </radialGradient>
                    <clipPath id="clip0_5_323">
                      <rect width="32" height="24" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              
              <p className="w-[310px] text-black text-base font-normal leading-[21px] opacity-60" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Lorem ipsum dolor sit amet consectetur. Enim nulla suscipit leo integer bibendum ultrices. Nulla sed arcu amet montes tellus sit sem quis.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-start gap-3 opacity-50">
                {/* Facebook */}
                <div className="flex w-6 h-6 p-1.5 px-0 justify-center items-center rounded-full bg-black">
                  <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.2793 0V2.25H5.15234C4.30978 2.25006 4.25391 2.56464 4.25391 3.15137L4.25098 4.27734H6.29199L6.05273 6.52734H4.25098V13.0557H1.5498V6.52734H0.200195V4.27734H1.5498V2.92676C1.54981 1.09145 2.31172 7.59569e-05 4.47656 0H6.2793Z" fill="white"/>
                  </svg>
                </div>
                
                {/* Twitter */}
                <div className="flex w-6 h-6 px-1.5 py-[7.2px] justify-center items-center rounded-full bg-black">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.27734 0.3125C7.66338 0.176943 8.31801 0.159764 8.74609 0.27832C8.91397 0.329164 9.23333 0.498835 9.45996 0.651367L9.87109 0.930664L10.3242 0.787109C10.5758 0.710908 10.9112 0.583764 11.0625 0.499023C11.2044 0.423202 11.3306 0.380785 11.332 0.405273C11.332 0.549332 11.0209 1.04133 10.7607 1.3125C10.4083 1.69379 10.5092 1.72784 11.2227 1.47363C11.6504 1.32969 11.659 1.32947 11.5752 1.49023C11.5248 1.57496 11.2643 1.87144 10.9873 2.14258C10.5173 2.60865 10.4922 2.66 10.4922 3.0498C10.4921 3.65147 10.2072 4.90542 9.92188 5.5918C9.39307 6.87985 8.25913 8.21043 7.12598 8.87988C5.53123 9.82034 3.40786 10.0576 1.62012 9.50684C1.02416 9.32041 0 8.84548 0 8.76074C0.00307152 8.73536 0.312639 8.70179 0.688477 8.69336C1.47731 8.67638 2.26612 8.45607 2.9375 8.06641L3.39062 7.79492L2.87109 7.61719C2.13247 7.36298 1.46869 6.77833 1.30078 6.22754C1.25043 6.04961 1.26745 6.04102 1.7373 6.04102L2.22461 6.03223L1.81348 5.83789C1.32664 5.59214 0.881324 5.17663 0.663086 4.75293C0.503605 4.44787 0.302572 3.67651 0.361328 3.61719C0.379431 3.59254 0.555292 3.64344 0.755859 3.71094C1.33459 3.92259 1.40988 3.87144 1.07422 3.51562C0.444896 2.87171 0.251774 1.91434 0.553711 1.00781L0.696289 0.600586L1.25098 1.15137C2.3841 2.26139 3.7185 2.92229 5.24609 3.11719L5.66602 3.16797L5.64062 2.75293C5.56514 1.67678 6.22818 0.693825 7.27734 0.3125Z" fill="white"/>
                  </svg>
                </div>
                
                {/* Instagram */}
                <div className="flex w-6 h-6 p-[5.6px] justify-center items-center rounded-full bg-black">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99902 0.599609C8.73741 0.59961 8.95506 0.607607 9.6377 0.638672C10.3189 0.669891 10.7844 0.777303 11.1924 0.935547C11.6136 1.09887 11.9693 1.3179 12.3252 1.67383C12.6812 2.02957 12.9005 2.38668 13.0645 2.80762C13.2217 3.2144 13.3293 3.6794 13.3613 4.36035C13.392 5.04303 13.4004 5.26185 13.4004 7C13.4004 8.73751 13.392 8.95538 13.3613 9.6377C13.3293 10.3187 13.2218 10.7844 13.0645 11.1914C12.9005 11.6122 12.6812 11.9695 12.3252 12.3252C11.9697 12.6811 11.6131 12.9 11.1924 13.0635C10.7852 13.2217 10.3198 13.3301 9.63867 13.3613C8.95601 13.3924 8.73819 13.3994 7 13.3994C5.2621 13.3994 5.04389 13.3924 4.36133 13.3613C3.68012 13.3301 3.21482 13.2217 2.80762 13.0635C2.38697 12.9 2.02941 12.6812 1.67383 12.3252C1.3181 11.9696 1.10009 11.6122 0.936523 11.1914C0.778388 10.7845 0.670006 10.319 0.638672 9.6377C0.607751 8.95528 0.59961 8.73762 0.599609 7C0.599609 5.26185 0.608138 5.04303 0.638672 4.36035C0.669341 3.67967 0.776998 3.21453 0.935547 2.80762C1.09955 2.38682 1.31881 2.02956 1.6748 1.67383C2.03054 1.31796 2.38766 1.09902 2.80859 0.935547C3.2154 0.777354 3.68033 0.669892 4.36133 0.638672C5.04378 0.607615 5.26241 0.599614 6.99902 0.599609Z" fill="white"/>
                    <path d="M5.42676 0.753906C5.59709 0.75364 5.78749 0.753906 6.00098 0.753906C7.70947 0.753907 7.91215 0.759374 8.58691 0.790039C9.21085 0.81858 9.5498 0.923147 9.77539 1.01074C10.0739 1.12672 10.2869 1.26532 10.5107 1.48926C10.7347 1.71325 10.873 1.92692 10.9893 2.22559C11.0768 2.45088 11.1815 2.78936 11.21 3.41309C11.2406 4.08776 11.2471 4.29101 11.2471 5.99902C11.2471 7.70669 11.2406 7.90949 11.21 8.58398C11.1814 9.20799 11.0769 9.54712 10.9893 9.77246C10.8733 10.071 10.7347 10.284 10.5107 10.5078C10.2868 10.7317 10.074 10.8704 9.77539 10.9863C9.55007 11.0743 9.21085 11.1785 8.58691 11.207C7.91229 11.2377 7.70947 11.2441 6.00098 11.2441C4.29203 11.2441 4.08874 11.2377 3.41406 11.207C2.7903 11.1782 2.45128 11.0739 2.22559 10.9863C1.92706 10.8703 1.71417 10.7308 1.49023 10.5068C1.2663 10.2829 1.12699 10.0702 1.01074 9.77148C0.923179 9.54619 0.819429 9.20751 0.791016 8.58398C0.760349 7.90931 0.753906 7.70615 0.753906 5.99707C0.753907 4.28832 0.760359 4.08657 0.791016 3.41211C0.819542 2.78827 0.923156 2.44924 1.01074 2.22363C1.12674 1.92496 1.26623 1.71131 1.49023 1.4873C1.71404 1.26355 1.92726 1.12498 2.22559 1.00879C2.45114 0.920807 2.79032 0.81678 3.41406 0.788086C4.00447 0.761419 4.23395 0.753286 5.42676 0.751953V0.753906ZM6 2.71289C4.18518 2.7132 2.71387 4.1851 2.71387 6C2.71409 7.8149 4.18603 9.28516 6.00098 9.28516C7.81574 9.28494 9.28689 7.81476 9.28711 6C9.28711 4.18491 7.81509 2.71289 6 2.71289ZM9.41699 1.81641C8.99313 1.81641 8.64965 2.16004 8.64941 2.58398C8.64941 3.00799 8.99299 3.35254 9.41699 3.35254C9.84097 3.35251 10.1846 3.00797 10.1846 2.58398C10.1843 2.1602 9.84083 1.81644 9.41699 1.81641Z" fill="black"/>
                    <path d="M3.00054 0.867188C4.17869 0.867188 5.1339 1.82226 5.1339 3.00054C5.1339 4.17869 4.17869 5.1339 3.00054 5.1339C1.82226 5.1339 0.867188 4.17869 0.867188 3.00054C0.867188 1.82226 1.82226 0.867188 3.00054 0.867188Z" fill="black"/>
                  </svg>
                </div>
                
                {/* YouTube */}
                <div className="flex w-6 h-6 px-[5.6px] py-[7.6px] justify-center items-center rounded-full bg-black">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0.599609C7 0.599609 11.0029 0.599359 12.001 0.874023C12.5517 1.02516 12.9856 1.47065 13.1328 2.03613C13.3982 3.05303 13.4004 5.16622 13.4004 5.19922C13.4004 5.19922 13.4003 7.3383 13.1328 8.36328C12.9856 8.92868 12.5517 9.3742 12.001 9.52539C11.0028 9.79998 7 9.7998 7 9.7998C6.97731 9.7998 2.99436 9.7992 1.99902 9.52539C1.44836 9.37418 1.01443 8.92867 0.867188 8.36328C0.599769 7.3383 0.600586 5.19922 0.600586 5.19922C0.600602 5.16621 0.601862 3.05302 0.867188 2.03613C1.01438 1.47067 1.44832 1.02519 1.99902 0.874023C2.99436 0.600142 6.9773 0.599612 7 0.599609Z" fill="white"/>
                    <path d="M0.799805 4.40039V0.400391L3.9998 2.40047L0.799805 4.40039Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-black text-xl font-semibold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Destinations
              </h3>
              <div className="text-black text-base font-normal leading-[22px]" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Egypt<br/>
                Turkey<br/>
                USA<br/>
                France<br/>
                Greece
              </div>
            </div>

            {/* Useful Links */}
            <div className="flex flex-col items-center gap-5">
              <h3 className="text-black text-xl font-semibold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Useful Links
              </h3>
              <div className="text-black text-base font-normal leading-[22px] capitalize" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                About Us<br/>
                Travel Blog<br/>
                Be our partner<br/>
                F.A.Q<br/>
                Privacy policy
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-black text-xl font-semibold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Contact
              </h3>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-black" strokeWidth={2} />
                  <span className="text-black text-base font-normal leading-[21px]" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    (896) 675-9493
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-black" strokeWidth={2} />
                  <span className="text-black text-base font-normal leading-[21px]" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    mschwartz@icloud.com
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-black" strokeWidth={2} />
                  <span className="text-black text-base font-normal leading-[21px]" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    43 W. Wellington Road Fairhope,<br/>
                    AL 36532
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-black text-center text-sm font-normal opacity-50" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
          ©Copyright Travel Agency 2023. Design by Figma.guru
        </p>
      </div>
    </footer>
  )
}
