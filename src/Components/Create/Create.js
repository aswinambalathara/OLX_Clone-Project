import React, { useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import Loader from "../Loader/Loader.js";
import { AuthContext, FirebaseContext } from "../../store/Contexts";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading,setLoading] = useState(false);
  const history = useHistory();
  const date = new Date()
  // const handleSubmit = () => {
  //   try {
  //     firebase
  //     .storage()
  //     .ref(`/image/${image.name}`)
  //     .put(image)
  //     .then(({ ref }) => {
  //       ref.getDownloadURL().then((url) => {
  //         firebase.firestore().collection("products").add({
  //           name,
  //           category,
  //           price,
  //           url,
  //           userId: user.uid,
  //           createdAt: date.toDateString(),
  //         }).then(()=>history.push("/")).catch((firestoreErr)=>history.push('/login'))
          
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = () => {
    setLoading(true);
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
        setLoading(false)
        history.push("/");
      })
      .catch(error => {
        setLoading(false)
        console.error('Error:', error);
        history.push('/login');
      });
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
          <button className="uploadBtn" onClick={handleSubmit}>
            upload and Submit
          </button>
        </div>
      </card>
      
    </>
  );
};

export default Create;
