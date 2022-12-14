import { createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({ token: '', loggedIn: false });

  return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
}

export default UserContext;
