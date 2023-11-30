import React from 'react';
import MainSection from './MainSection.jsx';
import GetStarted from './GetStarted.jsx';
import Contributors from './Contributors.jsx';
import Footer from './Footer.jsx';
import FeatureSection from './FeatureSection.jsx';

function Splash() {
  return (
    <div>
      <MainSection />
      <FeatureSection />
      <GetStarted />
      <Contributors />
      <Footer />
    </div>
  );
}

export default Splash;
