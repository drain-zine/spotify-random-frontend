import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { IconButton } from "./styling";
import {millisToMinutesAndSeconds} from "../../../utils";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';

const PlaylistTable = ({playlist}: any) => {
  const columns = [
    { name: "TITLE", uid: "name" },
    { name: "ALBUM", uid: "album" },
    { name: 
        <Row align="center">
          POPULARITY
          <Tooltip content={"Spotify's Internal popularity metric. I have no idea what it means"}>
            <InfoIcon style={{marginLeft: "$4"}} fontSize="small"/>
          </Tooltip>
        </Row>,
       uid: "popularity" },
    { name: <Row align="center"><AccessTimeIcon fontSize="small"/></Row>, uid: "duration" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (song: any, columnKey: any) => {
    const cellValue = song[columnKey];
    switch (columnKey) {
      case "name":
        const { album, artists } = song;
        return (
          <User squared src={album.image} name={cellValue} css={{ p: 0, borderRadius: 0 }}>
            {artists.map((artist: any, idx: number) => `${artist.name}${idx === artists.length - 1 ? `` : `, `}`)}
          </User>
        );
      case "album":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {cellValue.name}
          </Text>
        );
      
      case "duration":
        return (
          <Text>{millisToMinutesAndSeconds(cellValue)}</Text>
        );

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
        return cellValue;
    }
  };
  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
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