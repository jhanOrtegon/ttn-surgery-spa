interface ISetLocalStorage {
  name: string;
  value: any;
}

export const setLocalStorage = ({ name, value }: ISetLocalStorage) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};
