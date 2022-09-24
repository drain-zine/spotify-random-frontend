import { Container, Row, Text } from "@nextui-org/react";
import ScrollableLine from "@components/ScrollableLine";
import { useIsTablet } from "@hooks/useMediaQuery";
import { Divider } from "./styling";

const Sidebar = () => {
  const isTabletPortrait = useIsTablet(false, false);

    return (
      <Container css={{ position: "relative" }}>
        {isTabletPortrait && <ScrollableLine/> }
        <Row>
          <Text h1 size={60}>
            Playlist of Babel
          </Text>
        </Row>
        {/* <div
          style={{
            width: "100%",
            height: 2,
            background: "var(--nextui-colors-text)",
            marginLeft: "-3rem",
          }}
        ></div> */}
        <Divider/>
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
