// import React from 'react'
// import NavBar from './small_components/navBar'
// import ScrollAnimation from './small_components/ScrollAnimation'
// export default function Home_Page() {
//   return (
//     <div>

//       <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
//         <NavBar />
//         <ScrollAnimation />
//         {/* Hero Section */}
//         <div>
//           <h1>Intelligent Stock Analysis, Simplified</h1>
//           <p>GenOne provides AI-powered insights to help you make smarter investment decisions in the Indian stock market</p>
//           <div>
//             <button>Get Started</button>
//             <button>View Demo</button>
//           </div>
//         </div>

//         {/* Market Overview Section */}
//         <div>
//           <h2>Todays Market Overview</h2>
//         </div>

        
//       </div>
//     </div>
//   )
// }

import React from 'react';
import NavBar from './ShortComponents/navBar';
import ScrollAnimation from './ShortComponents/ScrollAnimation';
import HeroSectionComponent from './ShortComponents/heroSection';
import MarketOverviewSection from './ShortComponents/marketOverviewSection';
// If you have lucide-react installed, uncomment the import below
// import { TrendingUp, PieChart, AlertTriangle, Activity } from 'lucide-react';
import FeaturesSection from './ShortComponents/featuresSection';
import Footer from '../small_components/Footer';

// If you don't have lucide-react, you can use these placeholder icons
const IconPlaceholder = ({ size = 24 }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid currentColor', borderRadius: '50%' }}>
    <span style={{ fontSize: size/2 }}>★</span>
  </div>
);

export default function Home_Page() {
  // CSS styles
  const styles = {
    container: {
      margin: 0,
      padding: 0,
      width: '100vw',
      minHeight: '100vh',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#121212',
      color: '#ffffff',
      fontFamily: "'Arial', sans-serif"
    }}
  //   heroSection: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     padding: '4rem 1rem',
  //     textAlign: 'center',
  //     background: 'linear-gradient(to bottom, #2d3748, #1a202c)'
  //   },
  //   heroTitle: {
  //     fontSize: '2.5rem',
  //     fontWeight: 'bold',
  //     marginBottom: '1rem'
  //   },
  //   heroSubtitle: {
  //     fontSize: '1.25rem',
  //     color: '#cbd5e0',
  //     maxWidth: '700px',
  //     marginBottom: '2rem'
  //   },
  //   buttonContainer: {
  //     display: 'flex',
  //     gap: '1rem'
  //   },
  //   primaryButton: {
  //     backgroundColor: '#3182ce',
  //     color: 'white',
  //     padding: '0.75rem 1.5rem',
  //     borderRadius: '0.5rem',
  //     fontWeight: '500',
  //     border: 'none',
  //     cursor: 'pointer',
  //     transition: 'background-color 0.2s'
  //   },
  //   secondaryButton: {
  //     backgroundColor: 'transparent',
  //     color: 'white',
  //     padding: '0.75rem 1.5rem',
  //     borderRadius: '0.5rem',
  //     fontWeight: '500',
  //     border: '1px solid #3182ce',
  //     cursor: 'pointer',
  //     transition: 'background-color 0.2s'
  //   },
  //   section: {
  //     padding: '3rem 1rem'
  //   },
  //   sectionDark: {
  //     padding: '3rem 1rem',
  //     backgroundColor: '#2d3748'
  //   },
  //   sectionTitle: {
  //     fontSize: '1.5rem',
  //     fontWeight: 'bold',
  //     marginBottom: '2rem',
  //     textAlign: 'center'
  //   },
  //   gridContainer: {
  //     display: 'grid',
  //     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  //     gap: '1.5rem',
  //     maxWidth: '1200px',
  //     margin: '0 auto'
  //   },
  //   card: {
  //     backgroundColor: '#2d3748',
  //     padding: '1.5rem',
  //     borderRadius: '0.5rem'
  //   },
  //   cardDark: {
  //     backgroundColor: '#1a202c',
  //     padding: '1.5rem',
  //     borderRadius: '0.5rem'
  //   },
  //   cardTitle: {
  //     fontSize: '1.25rem',
  //     fontWeight: '600',
  //     marginBottom: '0.5rem',
  //     display: 'flex',
  //     alignItems: 'center'
  //   },
  //   cardIcon: {
  //     marginRight: '0.5rem'
  //   },
  //   cardText: {
  //     color: '#cbd5e0'
  //   },
  //   cardCenter: {
  //     textAlign: 'center'
  //   },
  //   iconContainer: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     marginBottom: '1rem'
  //   },
  //   flexRow: {
  //     display: 'flex',
  //     justifyContent: 'space-between'
  //   },
  //   textGreen: {
  //     color: '#68d391'
  //   },
  //   textRed: {
  //     color: '#fc8181'
  //   },
  //   spacer: {
  //     marginBottom: '0.5rem'
  //   },
  //   stepContainer: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     marginBottom: '3rem',
  //     textAlign: 'center'
  //   },
  //   stepNumber: {
  //     backgroundColor: '#3182ce',
  //     color: 'white',
  //     width: '4rem',
  //     height: '4rem',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderRadius: '50%',
  //     fontSize: '1.5rem',
  //     fontWeight: 'bold',
  //     marginBottom: '1rem'
  //   },
  //   testimonialCard: {
  //     backgroundColor: '#2d3748',
  //     padding: '1.5rem',
  //     borderRadius: '0.5rem',
  //     marginBottom: '1.5rem'
  //   },
  //   testimonialQuote: {
  //     fontStyle: 'italic',
  //     color: '#cbd5e0',
  //     marginBottom: '1rem'
  //   },
  //   testimonialUser: {
  //     display: 'flex',
  //     alignItems: 'center'
  //   },
  //   testimonialAvatar: {
  //     width: '2.5rem',
  //     height: '2.5rem',
  //     borderRadius: '50%',
  //     marginRight: '1rem'
  //   },
  //   ctaSection: {
  //     padding: '4rem 1rem',
  //     textAlign: 'center',
  //     background: 'linear-gradient(to bottom, #1a202c, #2d3748)'
  //   },
  //   ctaTitle: {
  //     fontSize: '2rem',
  //     fontWeight: 'bold',
  //     marginBottom: '1rem'
  //   },
  //   ctaSubtitle: {
  //     fontSize: '1.25rem',
  //     color: '#cbd5e0',
  //     maxWidth: '700px',
  //     margin: '0 auto',
  //     marginBottom: '2rem'
  //   },
  //   ctaButton: {
  //     backgroundColor: '#3182ce',
  //     color: 'white',
  //     padding: '1rem 2rem',
  //     borderRadius: '0.5rem',
  //     fontWeight: '500',
  //     fontSize: '1.125rem',
  //     border: 'none',
  //     cursor: 'pointer',
  //     transition: 'background-color 0.2s'
  //   }
  // };

  return (
    <div style={styles.container}>
      <NavBar />

      <ScrollAnimation />
      {/* Hero Section */}
      <HeroSectionComponent></HeroSectionComponent>
      
      {/* Market Overview Section */}
      <MarketOverviewSection></MarketOverviewSection>
          
      {/* Features Section */}
      <FeaturesSection></FeaturesSection>
      <Footer/>
      
    </div>
  );
}