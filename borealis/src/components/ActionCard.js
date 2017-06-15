import React from 'react';
import { ListGroupItem, Image, Media } from 'react-bootstrap';
import LinkButton from './LinkButton';

class ActionCard extends React.Component {
  render() {
    return (
      <ListGroupItem>
        <Media>
          <Media.Left>
            <Image src={this.props.image} rounded/>
          </Media.Left>
          <Media.Body>
            <Media.Heading className="h3">
              {this.props.title}
            </Media.Heading>

            <LinkButton bsSize="small" to={this.props.link} bsStyle="primary">
              Aportar
            </LinkButton>
          </Media.Body>
        </Media>
      </ListGroupItem>
    );
  }
}

export default ActionCard;
