import { Container, Grid } from '@nextui-org/react';
import Sidebar from '@components/Sidebar';
import PlaylistContainer from '@components/Playlist';
import { useIsTablet } from '@hooks/useMediaQuery';
import ScrollableLine from '@components/ScrollableLine';

const Main = (): JSX.Element => {
  const isTabletPortrait = useIsTablet(false);
  const margin = '$8';

  return (
    <Container
      fluid
      css={{
        maxWidth: `calc(100% - 2 * ${margin})`,
        padding: 0,
        margin: `0 ${margin}`,
        position: 'relative',
      }}
    >
      {isTabletPortrait && <ScrollableLine />}
      <Grid.Container>
        <Grid sm={4} css={{ '@smMax': { width: '100%' } }}>
          <Sidebar />
        </Grid>
        <Grid
          sm={8}
          css={{
            '@smMax': {
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <PlaylistContainer />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Main;
