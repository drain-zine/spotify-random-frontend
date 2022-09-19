import { API } from '../api';
import PlaylistTable from '../components/Playlist/PlaylistTable';
import { Text,Button } from "@nextui-org/react";
import { Playlist } from '../type';

interface HomeProps{
  playlist: Playlist
};

const Home = ({playlist}: HomeProps): JSX.Element => {
  return (
      <main>
       {/* {JSON.stringify(playlist)} */}
       <PlaylistTable playlist={playlist}/>
       <Text>Hello world!</Text>
       <Button>NextUI Button</Button>
      </main>
  );
}

export async function getServerSideProps() {
  const api = new API();
  let playlist;

  try{
    playlist = await api.getRandomPlaylist();
  } catch {
    playlist = "Not Found :(";
  }

  return {
    props: {
      playlist
    }
  };
}

export default Home;
