import PlaylistTable from '../../components/Playlist/PlaylistTable';
import { Playlist } from '../../type';
import { Container, Grid } from "@nextui-org/react";
import Sidebar from '../../components/Sidebar';

interface MainProps{
    playlist: Playlist
};

  
const Main = ({playlist}: MainProps): JSX.Element => {
    const margin = "$8";

    return (
        <Container fluid css={{maxWidth: `calc(100% - 2 * ${margin})`, padding: 0, margin: `0 ${margin}`}}>
            <Grid.Container>
                <Grid sm={4}>
                    <Sidebar/>
                </Grid>
                <Grid sm={8}>
                    <Container fluid css={{padding: 0, margin: 0}}>
                        <PlaylistTable playlist={playlist}/>
                    </Container>
                </Grid>
            </Grid.Container>
            </Container>
         
    );
};

export default Main;