import PlaylistTable from "./PlaylistTable";
import PlaylistMeta from "./PlaylistMeta";

import { Container, Loading, Row, Spacer  , Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import {
  selectIsPlaylistErrored,
  selectIsPlaylistLoading,
  selectPlaylist,
  selectPlaylistMeta,
} from "../../slice/playlist";
import { Playlist } from "../../type";
import { useIsTablet } from "../../hooks/useMediaQuery";

const PlaylistContainer = () => {
  const playlist = useSelector(selectPlaylist);
  const playlistMeta = useSelector(selectPlaylistMeta);
  const isPlaylistLoading = useSelector(selectIsPlaylistLoading);
  const isPlaylistError = useSelector(selectIsPlaylistErrored);  const isTablet = useIsTablet();

  return (
    <Container fluid css={{ padding: 0, margin: 0 }}>
      <Row>
        <PlaylistMeta meta={playlistMeta} />
      </Row>
      <Spacer y={ isTablet ? 1 : 2} />
      <Row css={{justifyContent: isPlaylistLoading && isPlaylistError ? "center": undefined}}>
        {isPlaylistLoading ? isPlaylistError ? 
          <Text>The information you are trying to access is too powerful for Spotify's Service. Refresh the playlist</Text> :
          <Loading css={{ left: "50%", marginTop: "15vh" }} /> :
          <PlaylistTable playlist={playlist as Playlist} />
        }
      </Row>
    </Container>
  );
};

export default PlaylistContainer;
