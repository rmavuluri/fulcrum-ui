export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('username');
};

export const setAuthToken = (username: string): void => {
  localStorage.setItem('username', username);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('username');
};

export const getUsername = (): string | null => {
  return localStorage.getItem('username');
};