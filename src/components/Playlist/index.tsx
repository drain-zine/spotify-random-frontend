import PlaylistTable from './PlaylistTable';
import PlaylistMeta from './PlaylistMeta';

import { Container, Loading, Row } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { selectIsPlaylistLoading, selectPlaylist, selectPlaylistMeta } from '../../slice/playlist';
import { Playlist } from '../../type';

const PlaylistContainer = () => {
    const playlist = useSelector(selectPlaylist);
    const playlistMeta = useSelector(selectPlaylistMeta);
    const isPlaylistLoading = useSelector(selectIsPlaylistLoading);

    return (
        <Container fluid css={{padding: 0, margin: 0}}>
            <Row>
                <PlaylistMeta meta={playlistMeta}/>
            </Row>
            <Row>
                {isPlaylistLoading ?
                    <Loading css={{left: "50%", marginTop: "25vh"}}/> :
                    <PlaylistTable playlist={playlist as Playlist}/>
                } 
            </Row>
        </Container>
    );
};

export default PlaylistContainer;