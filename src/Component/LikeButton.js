import React, { useState, useEffect } from "react";
import { Button,  Icon, Label  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks"
import KikiPropup from "../util/kikiPropup";

function LikeButton({ post, user }) {
 
    const { id , likes , likeCount } = post
  const [liked, setlike] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setlike(true);
    } else {
      setlike(false);
    }
  }, [user, likes]);
  const likeButtonDyn = user ? (
    liked ? (
      <Button color="pink">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="pink" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button basic color="pink" as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  const [likePost] = useMutation(LIKE_POST,{
      variables:{
          postId:id
      }
  }) 

  return (
    <KikiPropup content={liked?"unlike":"like"} >
       <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButtonDyn}
      <Label as="a" basic color="pink" pointing="left">
        {likeCount}
      </Label>
    </Button>
    </KikiPropup>
 
  );
}

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
