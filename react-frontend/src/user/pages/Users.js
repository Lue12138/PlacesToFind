import React from 'react';

import UsersList from '../components/UsersList';
import img from "./Bob.jpg";

const Users = () => {
  const USERS = [{ id: 'u1', name: 'Bob', image: img, places: 1 }];

  return <UsersList items={USERS}/>;
};

export default Users;
