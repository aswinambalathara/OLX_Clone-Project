import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Contexts";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Header() {
  const { user } = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const history = useHistory()

 const  handleSellBtn = () =>{
  if(!user){
    history.push('/login')
  }else{
    history.push('/create');
  }
 }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'><OlxLogo></OlxLogo></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span className="authButton">{user ? `Welcome ${user.displayName}` : <Link to='/login'>Login</Link>}</span>
          <hr />
        </div>
        {user && <span className="authButton" onClick={()=>{
          firebase.auth().signOut();
          history.replace('/login');
        }}>Logout</span>}
        <div className="sellMenu" onClick={handleSellBtn}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
             <span> SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
