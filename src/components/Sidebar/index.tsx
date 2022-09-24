import { useEffect, useState } from "react";
import { Container, Row, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectIsPlaylistLoading } from "../../slice/playlist";
const { motion, useScroll, useSpring } = require("framer-motion");

const Sidebar = () => {
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

  console.log(scrollHoist);
  return (
    <Container css={{ position: "relative" }}>
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
      <Row>
        <Text h1 size={60}>
          Playlist of Babel
        </Text>
      </Row>
      <div
        style={{
          width: "100%",
          height: 2,
          background: "var(--nextui-colors-text)",
          marginLeft: "-3rem",
        }}
      ></div>
      <Row css={{ marginTop: "$5" }}>
        <Text size={16}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non
          tempus ante, eu ullamcorper lorem. Morbi eget ligula eros. Vivamus
          viverra ligula sed maximus scelerisque. Proin leo felis, commodo quis
          auctor ut, laoreet eget dui. Maecenas vestibulum condimentum
          condimentum. Proin egestas viverra urna nec blandit. Etiam condimentum
          felis ut maximus varius. Curabitur lobortis porttitor justo, vitae
          malesuada turpis porta sed. Mauris ullamcorper tincidunt euismod.
          Integer metus felis, consectetur id tortor id, finibus consectetur
          sapien. Morbi rhoncus ac nunc ut egestas.
        </Text>
      </Row>
      <Row css={{ marginTop: "$5" }}>
        <Text size={16}>
          Sed varius tellus non libero malesuada tempus. In id neque ultricies,
          ullamcorper ipsum ullamcorper, porttitor lectus. Sed dictum congue
          tortor. Nullam varius egestas rutrum. Nam dictum sagittis augue, vel
          imperdiet ex rutrum vitae. Donec purus eros, commodo in est ac,
          malesuada lacinia turpis. Mauris maximus gravida nisl, vitae ultrices
          libero condimentum id. Aliquam faucibus aliquam fringilla. Curabitur
          quis ultricies dui. Ut id nisi tristique turpis sagittis molestie nec
          non mi. Vivamus et porttitor augue. Cras ultrices vulputate nulla, id
          ultrices risus. Phasellus a dolor ex.
        </Text>
      </Row>
    </Container>
  );
};

export default Sidebar;
