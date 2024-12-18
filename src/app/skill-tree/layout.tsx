'use client';

import './styles/skill-tree.css';
import { useEffect } from 'react';

export default function SkillTreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Update viewport height for mobile browsers
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="flex flex-col w-full overflow-hidden bg-gray-900"
      style={{ 
          height: 'calc((var(--vh, 1vh) * 100) - 5rem)'
      }}
    >
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
}
