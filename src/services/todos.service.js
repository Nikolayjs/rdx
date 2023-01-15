import httpService from './http.service';
const todosEndpoint = 'todos/';
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
    return data;
  },
  create: async (info) => {
    const { data } = await httpService.post(todosEndpoint, info);
    return data;
  },
};

export default todosService;
