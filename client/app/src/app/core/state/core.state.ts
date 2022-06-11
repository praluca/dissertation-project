export interface ICoreState {
  authenticatedUser: any;
  loggedIn: boolean;
}

export function coreFactory(): ICoreState {
  return {
    loggedIn: false,
    authenticatedUser: {},
  };
}
