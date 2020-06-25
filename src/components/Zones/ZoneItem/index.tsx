import React from "react";
import { Zone } from "../../../global/models/zone-models";

interface Props {
  zone: Zone;
}

const ZoneItem: React.FC<Props> = (props) => {
  return <div>{props.zone}</div>;
};

export default ZoneItem;
