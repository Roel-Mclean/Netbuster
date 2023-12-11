import { useEffect, useState } from 'react';
import { styled, createGlobalStyle } from "styled-components";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Footer } from "../components/footer.tsx";
import { Montserrat } from 'next/font/google';
import Link from "next/link";

ChartJS.register(...registerables);
const montserrat = Montserrat({subsets : ['latin']});

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${montserrat.style.fontFamily}, sans-serif;
  }
  
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align to the left */
  padding: 10px; /* Add some padding around the content */
  background-color: #1F1F1F; /* Match the background color of the page */
`;

const Logo = styled.img`
  height: 80px; /* Set the size of the logo */
  margin-right: 30px; /* Add some space between logo and the title */
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
  background: #fff; 
`;

const Input = styled.input`
  border: 1px solid #EDEFF2;
  background-color: #EDEFF2;
  border-radius: 5px;
  height: 40px;
  width: 95%;
  font-size: 16px;
  padding: 0 10px;
  margin: 10px 0;
  color: #000;
`;

const UsersList = styled.div`
  width: 40%;
  margin-right: 20px;
`;

const Users = styled.div`
  width: 40%;
  margin-right: 20px;
`;

const UsersChart = styled.div`
  width: 60%;
`;

const Header = styled.h1`
  color: #d43425; // Netbuster red color
  text-align: center;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const UserEmail = styled.span`
  font-size: 16px;
  color: #333; // Dark text for readability
`;

const Button = styled.button`
  border-radius: 8px;
  background-color: #1F1F1F;
  border: none;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  margin: 5px;

  &:hover {
    cursor: pointer;
    background-color: #333;
  }
`;

export default function Home() {

  const [users, setUsers] = useState(["isaac@gmail.com", "roel@gmail.com", "bakhtawar@gmail.com", "azmain@gmail.com", "joe@gmail.com", "saahir@gmail.com"]); // Sample user data
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  const data = {
    labels: ['Nov 5', 'Nov 15', 'Nov 25', 'Dec 5'],
    datasets: [
      {
        label: 'Number of users logged in',
        data: [5, 7, 3, 10],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      // Add other categories if needed
    ],
  };

  // Chart data and options would remain the same as you have them
  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true
      }
    }
  };
  
  useEffect(() => {
    const fetchUsers = async () => {

    }
  
    fetchUsers();
  }, [])

  // Handle delete user function
  const handleDelete = (userEmail) => {
    setUsers(users.filter(user => user !== userEmail));
  };

  // Handle add user function 
  const handleAdd = () => {
    if (newUserEmail && newUserPassword) {
      setUsers([...users, newUserEmail]);
      setNewUserEmail(''); // Clear the input fields
      setNewUserPassword('');
    }
  };

  return (
    <>
        <GlobalStyle />
      <HeaderContainer>
        <Link href="http://localhost:3001/">
        <Logo
          src="/images/logo.png"
          alt="Netbuster"
        />
        </Link>
        <Header>Admin</Header>
      </HeaderContainer>
      <Container>
        <UsersList>
          <h2>Users</h2>
          {users.map(user => (
            <User key={user}>
              <UserEmail>{user}</UserEmail>
              <Button onClick={() => handleDelete(user)}>Delete</Button>
            </User>
          ))}
          <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
          <Button onClick={handleAdd}>Add</Button>
        </UsersList>
        <UsersChart>
          <h2>Users in the last 30 days</h2>
          <Line data={data} options={options} />
        </UsersChart>
      </Container>
      <Footer></Footer>
    </>
  )
}