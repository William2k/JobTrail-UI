import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { Zone } from "../../../global/models/zone-models";

const Item = styled.div`
  flex: 1;
  border: 1px solid red;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  transition: 1s;
`;

interface Props {
  zone: Zone;
}

const ZoneItem = (props: Props) => {
  const dispatch = useDispatch();

  const openZone = () => {
    dispatch(push(`/zones/${props.zone.id}`));
  };

  return (
    <Item>
      <div>{props.zone.name}</div> <div>{props.zone.description}</div> <div>
        <button className="btn btn-secondary" onClick={openZone}>Open</button>
      </div>
    </Item>
  );
};

export default ZoneItem;
