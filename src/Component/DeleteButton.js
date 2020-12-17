import React, { useState, useEffect } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import KikiPropup from "../util/kikiPropup";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
function DeleteButton({ id, callBack, postId, commentId }) {
  const [openModal, setModal] = useState(false);
  const theFetchChoice = commentId ? DELETE_COMMENT : DELETE_POST;
  const values = commentId ? { postId, commentId } : { postId: id };
  console.log(theFetchChoice);
  const [DeletePost] = useMutation(theFetchChoice, {
    variables: values,
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
    update(proxy) {
      setModal(false);
      if (callBack) callBack();
    },
  });

  return (
    <KikiPropup content={commentId ? "Delete a comment" : "Delete a post"}>
      <Button
        labelPosition="right"
        floated="right"
        onClick={() => setModal(true)}
      >
        <Button basic color="red">
          <Icon name="trash alternate outline" />
        </Button>{" "}
        <Confirm
          open={openModal}
          onCancel={() => setModal(false)}
          onConfirm={DeletePost}
        />
      </Button>
    </KikiPropup>
  );
}

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
    }
  }
`;

export default DeleteButton;
