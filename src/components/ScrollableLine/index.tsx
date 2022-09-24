import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsPlaylistLoading } from "@redux/slice/playlist";
const { motion, useScroll, useSpring } = require("framer-motion");

const ScrollableLine = () => {
    const { scrollYProgress } = useScroll();
  const isPlaylistLoading = useSelector(selectIsPlaylistLoading);
  const [scrollHoist, setScrollHoist] = useState(0);
  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

    useEffect(() => {
        return scrollY.onChange((latest: number) =>
          setScrollHoist(isPlaylistLoading ? 0 : latest * 100)
        );
      }, [isPlaylistLoading]);

    return (
    <motion.div
        style={{
          height: `${scrollHoist}%`,
          width: 1,
          position: "absolute",
          transform: "translate(-50%)",
          left: "50%",
          top: 0,
          background: "var(--nextui-colors-text)",
        }}
      />
    );
}

export default ScrollableLine;