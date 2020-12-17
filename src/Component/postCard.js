import React, { useContext } from "react";
import { Button, Card, Image, Icon, Label,  } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import KikiPropup from "../util/kikiPropup"

function PostCard({
  post: { likeCount, commentCount, username, createdAt, body, id, likes },
}) {
  const commentOnPost = () => {
    console.log("comment");
  };
  const context = useContext(AuthContext);

  return (
    <Card fluid color="pink">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description as={Link} to={`/posts/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} user={context.user} />
        <KikiPropup
      
          content="comment on post"
        >
           <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button basic color="green">
                <Icon name="comment" />
              </Button>
              <Label as="a" basic color="green" pointing="left">
                {commentCount}
              </Label>
            </Button>
        </KikiPropup>

        {context.user && context.user.username === username && (
          <DeleteButton id={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
