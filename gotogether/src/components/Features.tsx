'use client'

const features = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.6" d="M63.3956 47.7617C63.2469 47.2799 62.9102 46.8782 62.4617 46.6476L56.5011 43.5815V25.7179C56.5011 24.6824 55.6616 23.8429 54.6261 23.8429H50.8925V17.0575C50.8925 16.022 50.053 15.1825 49.0175 15.1825H39.0095V1.875C39.0095 0.8395 38.17 0 37.1345 0H27.8655C26.83 0 25.9905 0.8395 25.9905 1.875V15.1825H15.9825C14.947 15.1825 14.1075 16.022 14.1075 17.0575V23.8427H10.3737C9.33825 23.8427 8.49875 24.6822 8.49875 25.7177V43.5814L2.53812 46.6475C2.08962 46.8781 1.75312 47.2797 1.60425 47.7616C1.4555 48.2434 1.507 48.7649 1.74737 49.2082L9.233 63.0182C9.56087 63.623 10.1936 63.9997 10.8815 63.9997H54.1185C54.8064 63.9997 55.439 63.623 55.767 63.0182L63.2526 49.2082C63.4929 48.7651 63.5444 48.2436 63.3956 47.7617ZM35.2595 3.75V7.53H29.7405V3.75H35.2595ZM29.7405 11.28H35.2595V15.1826H29.7405V11.28ZM17.8574 18.9325H47.1425V23.8427H17.8574V18.9325ZM12.2487 27.5929H52.7512V41.6525L33.3577 31.6762C32.8194 31.3992 32.1807 31.3992 31.6424 31.6762L12.2487 41.6525V27.5929ZM5.95725 49.1059L30.625 36.4166V60.25H11.9979L5.95725 49.1059ZM53.0021 60.25H34.375V36.4166L59.0427 49.1059L53.0021 60.25Z" fill="black"/>
      </svg>
    ),
    title: 'Real-Time Collaboration',
    subtitle: 'Book With Confidence',
    description: 'See who\'s viewing what, add comments, and make decisions together. No more endless group chats or lost ideas.'
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.6" clipPath="url(#clip0_5_158)">
          <path d="M63.0914 36.6038L58.0331 30.7048C56.808 29.2761 55.026 28.4566 53.1439 28.4566H35.1124L28.6626 22.5231C28.3165 22.2047 27.8634 22.0279 27.3932 22.0279H18.842C18.163 22.0279 17.5373 22.3949 17.2058 22.9874C16.8743 23.5799 16.8889 24.3052 17.2442 24.8838L19.4377 28.4566H14.5641L9.59881 18.8244C9.27719 18.2006 8.63421 17.8086 7.93224 17.8086H2.37493C1.33947 17.8086 0.5 18.6481 0.5 19.6835V32.4691C0.5 40.0351 6.65541 46.1905 14.2213 46.1905H58.6835C60.9788 46.1905 63.0003 44.895 63.9591 42.8096C64.918 40.7242 64.5856 38.3462 63.0914 36.6038ZM55.1866 33.1458L57.4748 35.8143H54.9662C52.6013 35.8143 50.5815 34.3091 49.814 32.2066H53.1439C53.9302 32.2066 54.6747 32.5488 55.1866 33.1458ZM26.662 25.7779L36.0588 34.4225H27.5007L22.1932 25.7779H26.662ZM4.24987 21.5586H6.78928L10.3453 28.4567H4.24987V21.5586ZM60.5523 41.243C60.2074 41.9929 59.5088 42.4406 58.6835 42.4406H14.2213C8.72309 42.4406 4.24987 37.9674 4.24987 32.4692V32.2066H13.4212H21.74L24.8539 37.2785C25.195 37.834 25.8 38.1725 26.4517 38.1725H40.8661C41.6387 38.1725 42.3322 37.6985 42.6129 36.9788C42.8936 36.2591 42.7041 35.4407 42.1355 34.9177L39.1885 32.2067H45.9254C46.7942 36.4017 50.5176 39.5643 54.9662 39.5643H60.3023C60.392 39.5643 60.4796 39.5558 60.5661 39.5436C60.8108 40.0751 60.8114 40.6793 60.5523 41.243Z" fill="black"/>
        </g>
        <defs>
          <clipPath id="clip0_5_158">
            <rect width="64" height="64" fill="white" transform="translate(0.5)"/>
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'AI Powered',
    subtitle: 'Stress-free experience',
    description: 'Senectus commodo morbi aliquet eget quis gravida. Ut vel curabitur ut a id tempor. Viverra non commodo vel ac aliquet. Ac euismod tincidunt sed quam pharetra laoreet nisl mollis vitae.'
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5_167)">
          <g opacity="0.6">
            <path d="M62.125 9.42275H56.303C55.4635 4.09088 50.8374 0 45.2735 0H18.7266C13.1626 0 8.5365 4.09088 7.69713 9.42275H1.875C0.8395 9.42275 0 10.2622 0 11.2978V22.6513C0 23.6868 0.8395 24.5263 1.875 24.5263C2.9105 24.5263 3.75 23.6868 3.75 22.6513V13.1728H7.56063V52.7475C6.59963 52.8283 5.8445 53.6326 5.8445 54.6145C5.8445 55.65 6.684 56.4895 7.7195 56.4895H11.5317V62.125C11.5317 63.1605 12.3713 64 13.4067 64H22.3691C23.4046 64 24.2441 63.1605 24.2441 62.125V56.4895H39.7559V62.125C39.7559 63.1605 40.5954 64 41.6309 64H50.5933C51.6288 64 52.4683 63.1605 52.4683 62.125V56.4895H56.2805C57.316 56.4895 58.1555 55.65 58.1555 54.6145C58.1555 53.6326 57.4004 52.8283 56.4394 52.7475V13.1728H60.25V22.6513C60.25 23.6868 61.0895 24.5263 62.125 24.5263C63.1605 24.5263 64 23.6868 64 22.6513V11.2978C64 10.2622 63.1605 9.42275 62.125 9.42275ZM11.3106 52.7395V48.6203H20.1634C21.1989 48.6203 22.0384 47.7808 22.0384 46.7453C22.0384 41.879 18.1095 37.92 13.2805 37.92H11.3106V33.8019H52.6893V37.8081H50.7194C45.8903 37.8081 41.9615 41.7671 41.9615 46.6334C41.9615 47.6602 42.7875 48.4961 43.8144 48.5083L52.6893 48.6131V52.7396L11.3106 52.7395ZM11.3106 41.67H13.2805C15.3888 41.67 17.1969 42.997 17.9342 44.8703H11.3106V41.67ZM52.6894 44.8628L46.0556 44.7845C46.7865 42.8974 48.6015 41.5581 50.7196 41.5581H52.6895L52.6894 44.8628ZM18.7266 3.75H45.2735C49.3626 3.75 52.6894 7.07675 52.6894 11.1659V30.0519H11.3106V11.1659C11.3106 7.07675 14.6375 3.75 18.7266 3.75ZM20.4941 60.25H15.2817V56.4895H20.4941V60.25ZM48.7183 60.25H43.5059V56.4895H48.7183V60.25Z" fill="black"/>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5_167">
            <rect width="64" height="64" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Smart Decision Making',
    subtitle: 'Flexible tour options',
    description: 'Viverra non commodo vel ac aliquet. Ac euismod tincidunt sed quam pharetra laoreet nisl mollis vitae.'
  }
]

export default function Features() {
  return (
    <section className="flex w-full px-[120px] py-[60px] justify-between items-start">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-10">
            <div className="w-16 h-16">
              {feature.icon}
            </div>
            <div className="flex flex-col items-center gap-5">
              <h3 className="text-black text-center text-2xl font-bold" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
                {feature.title}
              </h3>
              <p className="text-black text-center text-base font-normal opacity-80" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                {feature.subtitle}
              </p>
              <p className="w-[280px] h-[74px] overflow-hidden text-black text-center text-base font-normal opacity-60" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
