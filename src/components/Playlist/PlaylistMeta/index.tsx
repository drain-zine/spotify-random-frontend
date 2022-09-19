import { Text, Grid, Image, Row, Container, Button } from "@nextui-org/react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomPlaylist, selectIsPlaylistLoading } from "../../../slice/playlist";
import { AppDispatch } from "../../../store";
import { PlaylistMeta } from "../../../type";
import { generateDescription, generateName } from "../../../utils";

interface PlaylistMetaProps{
    meta: PlaylistMeta
}

const PlaylistMeta = ({meta}: PlaylistMetaProps) => {
    const isPlaylistLoading = useSelector(selectIsPlaylistLoading);
    const dispatch = useDispatch<AppDispatch>();
    const tempName = useMemo(() => generateName(), []);
    const tempDescription = useMemo(() => generateDescription(), []);
    //const tempDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non tempus ante, eu ullamcorper lorem.';
    const tempImgUrl = 'https://d3atsf3fgek2rw.cloudfront.net/content/uploads/2014/07/107-1002x1008.jpg';

    return(
        <Grid.Container css={{marginTop: "15vh"}}>
            <Grid md={4}>
                <Image
                    height={300}
                    width={300}
                    src={tempImgUrl}
                    showSkeleton
                    alt={`${tempName}-cover`}
                    //objectFit="fill"
                />
            </Grid>
            <Grid md={6} justify="center" alignItems="center" css={{position: "relative"}}>
                <Container>
                    <Row> 
                        <Text
                            h3
                            size={32}
                        >{tempName}</Text>
                    </Row>
                    <Row>
                        <Text
                            size={16}
                        >{tempDescription}</Text>
                    </Row>
                </Container>
                <div style={{
                    display: "flex",
                    position: "absolute", 
                    bottom: "0", 
                    left: "1.5rem"}}>
                    <Button 
                        onClick={() => dispatch(getRandomPlaylist())}
                        disabled={isPlaylistLoading}
                        auto 
                        bordered 
                        css={{maxWidth: "25%", marginRight: "$4"}}>
                            Refresh</Button>
                    <Button 
                        disabled={isPlaylistLoading}
                        auto
                        >Save</Button>
                </div>
            </Grid>
        </Grid.Container>
    )
};

export default PlaylistMeta;