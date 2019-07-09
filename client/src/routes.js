import PublicChat from "./components/PublicChat";
import RoomChat from "./components/RoomChat";
import LiveVisitors from "./components/LiveVisitors";

export default [
    //use exact so it only loads when url is exact match
  { path: "/", exact: true, Component: PublicChat },
  { path: "/roomchat", Component: RoomChat },
  { path: "/livevisitors", Component: LiveVisitors }
];
