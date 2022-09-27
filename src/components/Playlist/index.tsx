import PlaylistTable from './PlaylistTable';
import PlaylistMeta from './PlaylistMeta';

import { Container, Loading, Row, Spacer, Text } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import {
  selectIsPlaylistErrored,
  selectIsPlaylistLoading,
  selectPlaylist,
  selectPlaylistMeta,
} from '@redux/slice/playlist';
import { Playlist } from '@type';
import { useIsTablet } from '@hooks/useMediaQuery';
import { content } from '@data/content';

const PlaylistContainer = () => {
  const playlist = useSelector(selectPlaylist);
  const playlistMeta = useSelector(selectPlaylistMeta);
  const isPlaylistLoading = useSelector(selectIsPlaylistLoading);
  const isPlaylistError = useSelector(selectIsPlaylistErrored);
  const isTablet = useIsTablet();

  return (
    <Container fluid css={{ padding: 0, margin: 0 }}>
      <Row>
        <PlaylistMeta meta={playlistMeta} />
      </Row>
      <Spacer y={isTablet ? 1 : 2} />
      <Row
        css={{
          justifyContent:
            isPlaylistLoading && isPlaylistError ? 'center' : undefined,
        }}
      >
        {isPlaylistLoading ? (
          <Loading
            css={{
              left: '50%',
              transform: 'translate(-50%, 0)',
              margin: '15vh 0',
            }}
          />
        ) : isPlaylistError ? (
          <Text css={{ margin: '15vh 0' }}>{content.errorMsg}</Text>
        ) : (
          <PlaylistTable playlist={playlist as Playlist} />
        )}
      </Row>
    </Container>
  );
};

export default PlaylistContainer;
