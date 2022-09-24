import { Container, Row, Text } from "@nextui-org/react";
import ScrollableLine from "@components/ScrollableLine";
import { useIsTablet } from "@hooks/useMediaQuery";
import { Divider } from "./styling";
import { content } from "@data/content";

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
        <Divider/>
          {content.sidebarMain.map((paragraph: string) =>
            <Row css={{ marginTop: "$5" }}>
            <Text size={16}>
              {paragraph}
            </Text>
          </Row>
          )}
          {!!content?.sidebarFooter &&
          <Row css={{ marginTop: "$10" }}>
          <Text css={{
            fontStyle: 'italic'
          }} size={12}>
            {content.sidebarFooter}
          </Text>
        </Row>
          }

      </Container>
    );
};


export default Sidebar;
