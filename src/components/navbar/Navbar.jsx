import { Badge, Button } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React ,{useState , useEffect} from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import {Link , useLocation , useNavigate} from 'react-router-dom';
import {

  Menu,
  MenuItem,
  

} from "@mui/material";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {updateUserStatus} from '../../actions/user'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType  from '../../constants/actionTypes';

const Container = styled.div`
  height: 80px;

  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem2 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  
  const location = useLocation();
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [state , setstate] = useState(false);
  const [adminNav , setadminNav] = useState(false);
  const [id , setid] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status ,setstatus] = useState(false);

 
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
      dispatch(updateUserStatus(id ,{status}));
    
    navigate("/");

    setUser(null);
  };
  /*useEffect(() => {
    const token = user?.token;
    //console.log(user.result);
    if (token) {
      const decodedToken = decode(token);
      console.log(decodedToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);*/
  
  
 
const open2 =()=>{
  
    navigate(`/`);

}
  

  useEffect(() => {
    const token = user?.result;

    if (token) {
      console.log(token.firstname);
      if(token.firstname === "admin"){
        setadminNav(true);
      }
      setid(token._id);
      
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  return (
    <div >
    <Container >
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>  
        <Center>
          <Logo>Notes Creater.</Logo>
        </Center>
        <Right>
        <MenuItem2><Button  component={Link} to="/" variant="contained"> Home</Button></MenuItem2>
       { user && (
        <>
        {adminNav && (
          <>
         
        <MenuItem2><Button  component={Link} to="/user" variant="contained">Admin</Button></MenuItem2>
        </>
          )}
          </>
          )}

      { user && (
              <>
         {!adminNav && (
          <>
        <MenuItem2><Button  component={Link} to="/notes" variant="contained">Notes</Button></MenuItem2>
        </>
          )}
           </>
          )}
      
        { user ? (
          <MenuItem2><Button variant="contained"  onClick={logout}> LOGOUT </Button></MenuItem2>):(
            <MenuItem2><Button component={Link} to="/Auth" variant="contained"> SIGN IN </Button></MenuItem2>)}
          
          {user && (
          <>
          <MenuItem2>
          <Button component={Link} to="/profile"  startIcon={<AccountCircleIcon />} variant="contained"> Profile </Button>
            
          </MenuItem2>
          </>
          )}
         
         
        </Right>
      </Wrapper>
    </Container>
    </div>
  )
}

export default Navbar