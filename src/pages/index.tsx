import { API } from "../api";
import { useEffect } from "react";
import Main from "../screens/main";
import { useDispatch } from "react-redux";
import { getRandomPlaylist } from "../slice/playlist";
import { AppDispatch } from "../store";
import { generateImage } from "../utils";

const Home = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRandomPlaylist());
    generateImage();
  }, [dispatch]);

  return <Main />;
};

export default Home;
