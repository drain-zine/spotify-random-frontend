import { useCallback } from "react";
import { Table, Row, Col, Tooltip, Text } from "@nextui-org/react";
import { IconButton } from "./styling";
import { millisToMinutesAndSeconds } from "../../../utils";
import SongRow from "../../Song/SongRow";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { Playlist, Song } from "../../../type";
import { useIsPhone } from "../../../hooks/useMediaQuery";

interface PlaylistTableProps {
  playlist: Playlist;
}

const PlaylistTable = ({ playlist }: PlaylistTableProps): JSX.Element => {
  const isPhone = useIsPhone();

  const columns = !isPhone
    ? [
        { name: "TITLE", uid: "name" },
        { name: "ALBUM", uid: "album" },
        {
          name: (
            <Row align="center">
              <Tooltip
                content={
                  "Spotify's Internal popularity metric. I have no idea what it means"
                }
              >
                POPL*
              </Tooltip>
            </Row>
          ),
          uid: "popularity",
        },
        {
          name: (
            <Row align="center">
              <AccessTimeIcon fontSize="small" />
            </Row>
          ),
          uid: "duration",
        },
        { name: "ACTIONS", uid: "actions" },
      ]
    : [
        { name: "TITLE", uid: "name" },
        {
          name: (
            <Row align="center">
              <Tooltip
                trigger={"click"}
                content={
                  "Spotify's Internal popularity metric. I have no idea what it means"
                }
              >
                POPL*
              </Tooltip>
            </Row>
          ),
          uid: "popularity",
        },
        { name: "ACTIONS", uid: "actions" },
      ];

  const renderCell = useCallback((song: Song, columnKey: any) => {
    const { album } = song;

    switch (columnKey) {
      case "name":
        return <SongRow song={song} showAlbum={isPhone} />;
      case "album":
        return (
          <Text b size={14}>
            {album.name}
          </Text>
        );

      case "duration":
        return millisToMinutesAndSeconds(song.duration);

      case "popularity":
        return song.popularity;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Open In Spotify"
                onClick={() => window.open(song.url)}
              >
                <IconButton>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return <></>;
    }
  }, []);

  return (
    <Table
      aria-label="Random Spotify Playlist"
      css={{
        tableLayout: "fixed",
      }}
      containerCss={{
        minWidth: "100%",
        maxWidth: "100%",
      }}
      selectionMode="none"
      shadow={false}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
            css={{
              wordWrap: "break-word",
              width:
                column.uid === "name" && isPhone
                  ? "75%"
                  : column.uid === "name" || column.uid === "album"
                  ? "40%"
                  : column.uid === "actions" && !isPhone
                  ? "5%"
                  : undefined,
            }}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={playlist}>
        {(song) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(song, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default PlaylistTable;
