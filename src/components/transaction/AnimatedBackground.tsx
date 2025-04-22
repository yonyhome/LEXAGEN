import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  gradient: string;
}

export default function AnimatedBackground({ gradient }: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Activa animación en el siguiente frame
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-[1500ms] ease-out rounded-full ${
        mounted ? 'scale-[6]' : 'scale-0'
      }`}
      style={{
        transformOrigin: 'center',
        zIndex: 0,
      }}
    />
  );
}
