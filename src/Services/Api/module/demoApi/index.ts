import api from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    demoApi: build.query({
      query: (city) =>
        `data/2.5/weather?units=metric&q=${city}&appid=30dbf5fbfaa3fa2517f8ed20337f8437`,
    }),
  }),
  overrideExisting: false,
});

// We can use the Lazy Query as well for GET requests depends on our Requirements.
// For POST request we will use mutations.
export const { useDemoApiQuery } = userApi;
