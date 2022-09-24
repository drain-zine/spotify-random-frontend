import { API } from "../api";
import { useEffect } from "react";
import Main from "../screens/main";
import { useDispatch } from "react-redux";
import { getRandomPlaylist, getRandomPlaylistMeta } from "../slice/playlist";
import { AppDispatch } from "../store";

const Home = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRandomPlaylist());
    dispatch(getRandomPlaylistMeta());
  }, [dispatch]);

  return <Main />;
};

export default Home;
