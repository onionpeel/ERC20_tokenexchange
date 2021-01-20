import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import './Header.css';

export const Header = () => {
  let userBalance = useSelector(state => state.userBalance.value);

  return (
    <Navbar className="Header">
      <Navbar.Brand href="#home">FUN Token Exchange</Navbar.Brand>
      <Navbar.Text className="ml-auto">
        <strong>User balance: {userBalance}</strong>
      </Navbar.Text>
    </Navbar>

  );
};
