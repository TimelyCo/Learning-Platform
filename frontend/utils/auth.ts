export const getToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
