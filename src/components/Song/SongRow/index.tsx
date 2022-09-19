import { Row, Col, Text } from "@nextui-org/react";
import PlayableCover from "../PlayableCover";
import { Song } from "../../../type";

interface SongRowProps{
    song: Song
};

const SongRow = ({song}: SongRowProps): JSX.Element => {
    const { album, artists } = song;
    return (
        <Row>
            <PlayableCover name={album.name} image={album.image} audioUrl={song.preview_url} />
            <Col css={{marginLeft: "$4"}}>
                <Col>
                    <Text weight="semibold" css={{fontSize: 14}} >{song.name}</Text>
                </Col>
                <Col>
                    <Text transform="capitalize" size="$xs">{artists.map((artist: any, idx: number) => `${artist.name}${idx === artists.length - 1 ? `` : `, `}`)}</Text>
                </Col>
            </Col>
        </Row>
    )
};

export default SongRow;