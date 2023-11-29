import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Comments } from '../../api/comment/Comments';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  comment: String,
  postId: String,
  createdAt: Date,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddComment = ({ owner, postId }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { comment, createdAt } = data;
    Comments.collection.insert(
      { comment, createdAt, postId, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h4>Comment</h4></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="comment-input" name="comment" />
                <Button id="comment-submit" color="primary" type="submit">Submit</Button>
                <ErrorsField />
                <HiddenField name="owner" value={owner} />
                <HiddenField name="postId" value={postId} />
                <HiddenField name="createdAt" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};
export default AddComment;
