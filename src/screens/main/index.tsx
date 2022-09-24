import { Container, Grid } from "@nextui-org/react";
import Sidebar from "@components/Sidebar";
import PlaylistContainer from "@components/Playlist";

const Main = (): JSX.Element => {
  const margin = "$8";

  return (
    <Container
      fluid
      css={{
        maxWidth: `calc(100% - 2 * ${margin})`,
        padding: 0,
        margin: `0 ${margin}`,
      }}
    >
      <Grid.Container>
        <Grid sm={4} css={{"@smMax": {width: "100%"} }}>
          <Sidebar />
        </Grid>
        <Grid sm={8} css={{"@smMax": {width: "100%", display: "flex", justifyContent: "center"} }}>
          <PlaylistContainer />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Main;
