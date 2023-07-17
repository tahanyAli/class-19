import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
function ModalCard({
  commentHandler,
  handleShow,
  handleClose,
  show,
  modalData,
}) {
  const commentRef = useRef();
  const [comment, setComment] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    // console.log(e.target);
    let userComment = commentRef.current.value;

    // console.log(userComment);
    let newRecipe = { ...modalData, userComment };
    console.log(newRecipe);
    setComment(userComment);
    commentHandler(newRecipe, newRecipe.id);
    console.log(comment);
  }
  async function addToFavHandler(e){
    e.preventDefault();
    let url = `${process.env.REACT_APP_SERVER_URL}/addFavRecipe`;
    let data = {
      title: modalData.title,
      readyInMinutes: modalData.readyInMinutes,
      summary: modalData.summary,
      sourceUrl: modalData.image,
      comment: modalData.comment
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const recievedData = await response.json();
    console.log("555",recievedData);
    if(response.status === 201){
      alert('successfully added to the Fav')
    }
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            style={{ width: "100%" }}
            src={modalData.image}
            alt={modalData.title}
          />
          <p>{modalData.instructions}</p>
          <p> {modalData.comment ? modalData.comment : "No comment Added"}</p>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                ref={commentRef}
                type="test"
                placeholder="Enter your comment"
              />
              {/*<Form.Text className="text-muted">
          enter your comment!
  </Form.Text>*/}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button onClick={(e) => addToFavHandler(e)} variant="secondary">
            Add to Favorite
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCard;
