import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { IconButton } from "./styling";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const PlaylistTable = ({playlist}: any) => {
  const columns = [
    { name: "TITLE", uid: "name" },
    { name: "ALBUM", uid: "album" },
    { name: "POPULARITY", uid: "popularity" },
    { name: <AccessTimeIcon/>, uid: "duration" },
    { name: "ACTIONS", uid: "actions" },
  ];
  // const users = [
  //   {
  //     id: 1,
  //     name: "Song 1",
  //     artists: ["Deez", "Nutz"],
  //     album: {
  //       name: "Wanking",
  //       image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  //     },
  //     popularity: 1,
  //     duration: "2:30",
  //     url: "https://fast.com"
  //   },
  //   {
  //     id: 2,
  //     name: "Song 2",
  //     artists: ["Bofa"],
  //     album: {
  //       name: "I<3Chu",
  //       image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  //     },
  //     duration: "5:50",
  //     popularity: 5,
  //     url: "https://fast.com"
  //   },
  //   {
  //     id: 3,
  //     name: "Song 3",
  //     artists: ["Slippin", "Jimmy"],
  //     album: {
  //       name: "DUN", 
  //       image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  //     },
  //     duration: "1:30",
  //     popularity: 3,
  //     url: "https://fast.com"
  //   },
  
  // ];

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
          <Text>{cellValue}</Text>
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
                  <OpenInNewIcon />
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