import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
function FavRecipe() {
  const [favRecipes, setFavRecipes] = useState([]);
  async function getFavRecipes() {
    let url = `${process.env.REACT_APP_SERVER_URL}/favRecipes`;
    let response = await fetch(url);
    let recivedData = await response.json();
    setFavRecipes(recivedData);
  }
  async function handleDelete(id) {
    // /deleteFavRecipe/:id
    let url = `${process.env.REACT_APP_SERVER_URL}/deleteFavRecipe/${id}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // let recievedData = await response.json();
    if(response.status === 204){
      alert('successfully deleted')
      getFavRecipes()
    }

  }
  useEffect(() => {
    getFavRecipes();
  }, []);
  console.log(favRecipes);
  return (
    <div>
      {favRecipes &&
        favRecipes.map((fav) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={fav.sourceurl} />
            <Card.Body>
              <Card.Title>{fav.title}</Card.Title>
              <Card.Text>{fav.readyinminutes}</Card.Text>
              <Button onClick={() => handleDelete(fav.id)} variant="primary">
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default FavRecipe;
