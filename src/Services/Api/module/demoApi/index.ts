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
export const { useDemoApiQuery } = userApi;                   
