// Create interface User:
 interface User {
    username: string;
    balance: number;
  }

 interface PlayerData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: number;
      geo: {
        lat: number;
        lng: number;
        }
    },
    phone: number;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

export {User, PlayerData};