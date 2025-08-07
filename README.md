# GoTogether - Travel Agency Website

A modern, responsive travel agency website built with Next.js, TypeScript, and Tailwind CSS. This project serves as a foundation for importing into Builder.io and Figma for further customization.

## 🚀 Features

- **Modern Design**: Clean, professional travel agency website design
- **Responsive Layout**: Fully responsive across all devices
- **Interactive Elements**: Hover effects, animations, and dynamic content
- **Component-Based**: Modular React components for easy maintenance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 📋 Sections

1. **Header**: Navigation with logo, menu items, and user actions
2. **Hero**: Dynamic rotating headline with teal/blue gradient background
3. **Search Bar**: Interactive search form with location, date, and guests inputs
4. **Popular Destinations**: Grid of destination cards with tour counts
5. **Features**: Three feature cards highlighting key services
6. **Testimonials**: Customer testimonial with profile and quote
7. **Call to Action**: Contact banner with phone number
8. **Footer**: Four-column layout with links and contact information

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Headless UI

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gotogether
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── SearchBar.tsx
│   ├── PopularDestinations.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── CallToAction.tsx
│   └── Footer.tsx
```

## 🎨 Design System

### Colors
- **Primary**: Teal/Blue gradients (`from-teal-500 to-blue-600`)
- **Text**: Black (`text-black`) and Gray variants
- **Background**: White (`bg-white`) and Gray variants
- **Accent**: Black for buttons and highlights

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with responsive sizing
- **Body**: Regular weight with good line height

### Components
- **Cards**: Rounded corners (`rounded-2xl`) with subtle shadows
- **Buttons**: Black background with white text, rounded corners
- **Inputs**: Clean borders with hover states

## 🔧 Customization

### Adding New Destinations
Edit the `destinations` array in `PopularDestinations.tsx`:

```typescript
const destinations = [
  { name: 'New Country', tours: 10, image: 'bg-gradient-to-br from-color1 to-color2' },
  // ... more destinations
]
```

### Modifying Features
Update the `features` array in `Features.tsx`:

```typescript
const features = [
  {
    icon: NewIcon,
    title: 'New Feature',
    subtitle: 'Subtitle',
    description: 'Description text'
  },
  // ... more features
]
```

### Changing Colors
Modify the Tailwind classes throughout the components or update the CSS variables in `globals.css`.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🔗 Builder.io Integration

This foundation is designed to work seamlessly with Builder.io:

1. **Component Structure**: All components are modular and can be easily converted to Builder.io components
2. **Styling**: Tailwind classes are compatible with Builder.io's styling system
3. **Props**: Components are designed to accept props for easy customization
4. **Responsive**: Mobile-first design works well with Builder.io's responsive features

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions, please contact:
- Email: info@goout.com
- Phone: (858) 577-3477

---

Built with ❤️ for amazing travel experiences 