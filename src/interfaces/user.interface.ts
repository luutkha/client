export interface UserInterface {
  id: number;
  name: string;
  email: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    };
  };
}


export interface UserInfo {
  token: Token
  user: User
}

export interface Token {
  tokenType: string
  accessToken: string
  refreshToken: string
  expiresIn: string
}

export interface User {
  id: string
  email: string
  role: string[]
  createdAt: string
}
