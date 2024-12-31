import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader: React.FC = () => (
  <CircularProgress style={{ color: "#8AB4F9" }} size={70} />
);

export default Loader;
