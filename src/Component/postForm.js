import React from "react"
import {useForm } from "../util/hooks"
import gql from 'graphql-tag'
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import {FETCH_POSTS_QUERY} from "../util/graphql"

function PostForm(){
    const {handleChange , submit , values } =useForm(submitThePost,{
        body:''
    });

    const [submitPost,{ error }] = useMutation(POST_SOME_POST,{
        variables:values,
        update(proxy,result){
            // get the result from the cache
            const data = proxy.readQuery({
                query:FETCH_POSTS_QUERY,
                variables:values
            });
            // add the new one in the data

            data.getPosts = [result.data.createPost,...data.getPosts];
            proxy.writeQuery({ query:FETCH_POSTS_QUERY,data,variables:values});            
            values.body=''
           
        }
    })
    function submitThePost(){
        submitPost()
    }

    return (
        <Form onSubmit={submit}>
            <h4>post anything..</h4>
            <Form.Field>
            <Form.Input
            placeholder='mozart is great..'
            name='body'
            onChange={handleChange}
            value={values.body}
            error={error?true:false}         
            />
            </Form.Field>
           
            <Form.Button floated="right" type='submit' color='pink'>Post</Form.Button>
            {
                error &&(
                    <div className='ui negative message'>
                        <ul>
                            <li>{error.graphQLErrors[0].message}</li>
                        </ul>

                    </div>

                )
            }
        </Form>
    );


}
const POST_SOME_POST = gql`
mutation createPost($body:String!){
    createPost(body:$body){
        id body username createdAt likeCount commentCount
        likes{
            id username createdAt
        }
        comments{
            body username createdAt id
        }
    }

}
`;

export default PostForm