import Cookies from 'js-cookie';

export const createPostQuery = (url: string) => ({
  query: (args: any) => ({
    url,
    method: 'POST',
    body: args,
  }),
});

export const createGetQuery = (url: string) => ({
  query: () => ({
    url,
    method: 'GET',
  }),
});

export const createGetArgsQuery = (url: string) => ({
  query: (args: string) => ({
    url: `${url}/${args}`,
    method: 'GET',
  }),
});

export const headers = (headers: Headers) => {
  const token = Cookies.get('auth_token');

  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  return headers;
};
