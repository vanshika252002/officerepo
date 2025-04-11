const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about-us',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  FORGOT: '/forgot',
  WEATHER: '/weather',
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Master Plan',
  },
  LOGOUT: {
    path: ROUTES.LOGOUT,
    title: 'Logout',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: 'Register',
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: 'About us',
  },
  SIGNUP: {
    path: ROUTES.SIGNUP,
    title: 'Sign Up',
  },
  FORGOT: {
    path: ROUTES.FORGOT,
    title: 'Forgot Password',
  },
  WEATHER: {
    path: ROUTES.WEATHER,
    title: 'Weather',
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
