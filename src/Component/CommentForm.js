import React from "react"
import {useForm } from "../util/hooks"
import gql from 'graphql-tag'
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";


function CommentForm({postId}){
    const {handleChange , submit , values } =useForm(submitTheComment,{
        body:''
    });

    const [submitComment,{ error }] = useMutation(POST_COMMENT,{
        variables:{
            postId,
            body:values.body
        },
       
    })
    function submitTheComment(){
        submitComment()
    }

    return (
        <Form onSubmit={submit}>
            
            <Form.Field>
            <Form.Input
            placeholder='mozart is great..'
            name='body'
            onChange={handleChange}
            value={values.body}
            error={error?true:false}         
            />
            </Form.Field>
           
            <Form.Button type='submit' color='pink' floated="right">Post</Form.Button>
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
const POST_COMMENT = gql`
mutation addComment($postId:ID!,$body:String!){
    addComment(postId:$postId , body:$body){
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

export default CommentForm