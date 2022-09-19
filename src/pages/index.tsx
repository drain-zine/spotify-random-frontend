import { API } from '../api';
import Main from '../screens/main';
import { Playlist } from '../type';

interface HomeProps{
  playlist: Playlist
};

const Home = ({playlist}: HomeProps): JSX.Element => {
  return (
      <Main playlist={playlist} />
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
