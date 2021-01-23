import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentForm from "./CommentForm"

function PostView(props) {
  const postId = props.match.params.postId;

  const context = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_ONE_POST, {
    variables: {
      postId,
    },
  });
  function deletePostCallBack() {
    props.history.push("/");
  }
  let getPost = {};
  !loading && (getPost = data.getPost);

  let postLoader = <p>loading ...</p>;
  if (loading && !getPost) {
    postLoader = <p>loading ...</p>;
  } else if (!loading) {
    const {
      id,
      username,
      body,
      createdAt,
      comments,
      likes,
      commentCount,
      likeCount,
    } = getPost;
    postLoader = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="left"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            />
          </Grid.Column>
          <Grid.Column width={14} className="res-comment-col" >
            <Card fluid color="pink">
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <br />
              <Card.Content extra>
                <LikeButton
                  user={context.user}
                  post={{ id, likes, likeCount }}
                />
                <Button labelPosition="right">
                  <Button basic color="green">
                    <Icon name="comment" />
                  </Button>
                  <Label as="a" basic color="green" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {context.user&&(context.user.username === username) && (
                  <DeleteButton id={id} callBack={deletePostCallBack} />
                )}
              </Card.Content>
            </Card>
            {comments.map((com) => (
              <Card fluid key={com.id}>
                <Card.Content>
                  {" "}
                  {context.user && context.user.username === com.username && (
                    <DeleteButton postId={id} commentId={com.id} />
                  )}
                  <Card.Header>{com.username}</Card.Header>
                  <Card.Meta>{moment(com.createdAt).fromNow(true)}</Card.Meta>
                  <Card.Description>{com.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
            {
              context.user&&( <Card fluid>
            <Card.Content>
             <CommentForm postId={id}/>
            </Card.Content>
              
              
            </Card>)
            }
           
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postLoader;
}
const FETCH_ONE_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      likes {
        username
      }
      likeCount
      comments {
        body
        username
        id
        createdAt
      }
      commentCount
      username
      createdAt
    }
  }
`;
export default PostView;
