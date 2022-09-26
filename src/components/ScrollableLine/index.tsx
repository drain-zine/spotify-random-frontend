import { useEffect, useState } from 'react';
const { motion, useScroll, useSpring } = require('framer-motion');

const ScrollableLine = () => {
  const { scrollYProgress } = useScroll();
  const [scrollHoist, setScrollHoist] = useState(0);
  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.onChange((latest: number) => setScrollHoist(latest * 100));
  }, []);

  return (
    <motion.div
      style={{
        height: `${scrollHoist}%`,
        width: 1,
        position: 'absolute',
        transform: 'translate(-50%)',
        left: '50%',
        top: 0,
        background: 'var(--nextui-colors-text)',
      }}
    />
  );
};

export default ScrollableLine;
