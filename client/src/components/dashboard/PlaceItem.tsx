import React from "react";
import { Card, Icon } from "semantic-ui-react";

interface PlaceItemProps {
  id: string;
  name: string;
  peopleCount: number;
  clickHandler: () => void;
}

export const PlaceItem: React.FC<PlaceItemProps> = props => {
  return (
    <Card onClick={props.clickHandler}>
      <Card.Content header={props.name} />
      <Card.Content extra>
        <Icon name="user" />
        {props.peopleCount} boys would smash this
      </Card.Content>
    </Card>
  );
};
