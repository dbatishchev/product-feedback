import { User } from '../types/User';

const UsersAPI = {
  async fetchCurrentUser(): Promise<User> {
    return fetch(`${process.env.PUBLIC_URL}/user.json`)
      .then((res) => res.json());
  },
};

export default UsersAPI;
