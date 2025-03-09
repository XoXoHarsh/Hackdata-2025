interface User {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageUrl: string | null;
}

let user: User = {
  firstName: null,
  lastName: null,
  email: null,
  imageUrl: null,
};

export const setUser = (newUser: Partial<User>) => {
  user = { ...user, ...newUser };
};

export const getUser = (): User => {
  return user;
};

export const clearUser = () => {
  user = { firstName: null, lastName: null, email: null, imageUrl: null };
};
