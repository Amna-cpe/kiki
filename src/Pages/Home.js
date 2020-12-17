import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../Component/postCard";
import PostForm from "../Component/postForm";
import { AuthContext } from "../context/auth";

import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const context = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <h1>Recent posts</h1>{" "}
        </Grid.Column>
      </Grid.Row>
      {context.user && (
        <Grid.Row centered>
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row>
        {loading ? (
          <h1>loading..</h1>
        ) : (
          <Transition.Group >
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: "25px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
