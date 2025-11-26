import React, { useEffect, useState } from 'react';

const SnowEffect: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random(),
        fontSize: `${Math.random() * 10 + 10}px`,
      };
      return <div key={i} className="snowflake" style={style}>❄</div>;
    });
    setSnowflakes(flakes);
  }, []);

  return <div className="snow-container">{snowflakes}</div>;
};

export default SnowEffect;