import {
  Text,
  Loading,
  Grid,
  Image,
  Row,
  Container,
  Button,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../api";
import { useIsPhone } from "../../../hooks/useMediaQuery";
import {
  getRandomPlaylist,
  selectIsPlaylistLoading,
  selectPlaylist,
} from "../../../slice/playlist";
import { AppDispatch } from "../../../store";
import { PlaylistMeta } from "../../../type";
import { generateDescription, generateName } from "../../../utils";
import { getAuthPopup } from "../../../utils/getAuthPopup";

interface PlaylistMetaProps {
  meta: PlaylistMeta;
}

const PlaylistMeta = ({ meta }: PlaylistMetaProps) => {
  const isPlaylistLoading = useSelector(selectIsPlaylistLoading);
  const dispatch = useDispatch<AppDispatch>();
  const tempName = useMemo(() => generateName(), []);
  const tempDescription = useMemo(() => generateDescription(), []).join(" ");
  //const tempDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non tempus ante, eu ullamcorper lorem.';
  //const tempImgUrl = 'https://d3atsf3fgek2rw.cloudfront.net/content/uploads/2014/07/107-1002x1008.jpg';
  const tempImgUrl =
    "https://farm4.staticflickr.com/3851/14924040227_fe0a2ceb18.jpg";
  const playlist = useSelector(selectPlaylist);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPhone = useIsPhone();

  const createPlaylist = async () => {
    const popup = getAuthPopup(
      `${process.env.NEXT_PUBLIC_API_URL}/spotify/auth`
    );
    const popupWindow = popup.open();
    try {
      if (popupWindow === null) return false;
      setIsSubmitting(true);
      const api = new API();

      const rawToken = await popup.handleMessageCallback(popupWindow);
      const trackIds = playlist.map((song) => `spotify:track:${song.id}`);
      await api.createPlaylist(
        tempName,
        tempDescription,
        tempImgUrl,
        trackIds,
        (rawToken as any).token
      );
      setIsSubmitting(false);
      return true;
    } catch {
      setIsSubmitting(false);
      return false;
    }
  };

  return (
    <Grid.Container
      css={{ marginTop: "15vh", "@mdMax": { padding: "0 var(--nextui-space-sm)"}, "@xsMax": { justifyContent: "center" } }}
    >
      <Grid md={4}>
        <Image
          height={300}
          width={300}
          src={tempImgUrl}
          showSkeleton
          alt={`${tempName}-cover`}
        />
      </Grid>
      <Grid
        md={6}
        justify="center"
        alignItems="center"
        css={{ position: "relative", "@xsMax": { marginTop: "$4" } }}
      >
        <Container css={{"@mdMax": { padding: 0}}}>
          <Row css={{
              "@xsMax": {
                  margin: "$5 0",
                  justifyContent: "center"
              },
              "@mdMax": {
                  margin: "$5 0"
              }
          }}>
            <Text h3 size={32}>
              {tempName}
            </Text>
          </Row>
          <Row>
            <Text size={16}>{tempDescription}</Text>
          </Row>
          <Row
            css={{
              display: "flex",
              marginTop: "$12",
              "@mdMin": {
                position: "absolute",
                bottom: "0",
                left: "1.5rem",
              },
            }}
          >
            <Button
              onClick={() => dispatch(getRandomPlaylist())}
              disabled={isPlaylistLoading}
              auto
              bordered
              css={{ maxWidth: "25%", marginRight: "$4" }}
            >
              Refresh
            </Button>
            <Button
              onClick={() => createPlaylist()}
              disabled={isPlaylistLoading || isSubmitting}
              auto
              css={{
                "& > .nextui-button-text": {
                  color: "$secondary",
                },
              }}
            >
              {isSubmitting ? <Loading /> : "Save"}
            </Button>
          </Row>
        </Container>
      </Grid>
    </Grid.Container>
  );
};

export default PlaylistMeta;
