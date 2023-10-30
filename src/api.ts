import axios from "axios";

/**
 *  In this implementation we use the jsonplaceholder api, so we don't
 *  actually update the data on the server (that's the reason the TODO will
 *  always be unfinished)
 */
const apiPath = "https://jsonplaceholder.typicode.com/todos/1";
const queryKey = ["todos", "1"];

const getTodoQueryFn = async () => {
  const { data } = await axios.get(apiPath);

  return data;
};

const completeTodoMutationFn = (completed: boolean) =>
  axios.patch(apiPath, { completed });

export { completeTodoMutationFn, getTodoQueryFn, queryKey };
