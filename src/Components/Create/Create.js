import React, { useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Contexts";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [errors,setErrors] = useState({});
  const history = useHistory();
  const date = new Date()

  const validate = () =>{
    const errors = {}

    if(!name){
      errors.name = "Name is required";
    }

    if(!category){
      errors.category = "Category is required";
    }

    if(!price){
      errors.price = "Price is required";
    }

    if(image === null){
      errors.image = "Image is required";
    }

    return errors;
  }

  const handleSubmit = () => {
    const productErrors = validate()
    if(Object.keys(productErrors).length === 0){
      setErrors({})
      const storageRef = firebase.storage().ref(`/image/${image.name}`);
    storageRef.put(image)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        return firebase.firestore().collection("products").add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString(),
        });
      })
      .then(() => {
        history.replace("/");
      })
      .catch(error => {
        console.error('Error:', error);
        history.replace('/login');
      });
    }else{
      setErrors(productErrors);
    }
  };

  
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <div>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            {errors.name && <p style={{color:'red',fontSize:'small'}}>{errors.name}</p>}
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            {errors.category && <p style={{color:'red',fontSize:'small'}}>{errors.category}</p>}
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="fname"
              name="Price"
            />
            <br />
            {errors.price && <p style={{color:'red',fontSize:'small'}}>{errors.price}</p>}
          </div>
          <br />
          {image && (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            ></img>
          )}

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          {errors.image && <p style={{color:'red',fontSize:'small'}}>{errors.image}</p>}
          <button className="uploadBtn" onClick={handleSubmit}>
            upload and Submit
          </button>
        </div>
      </card>
      
    </>
  );
};

export default Create;
