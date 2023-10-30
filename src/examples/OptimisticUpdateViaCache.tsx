import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { completeTodoMutationFn, getTodoQueryFn, queryKey } from "../api";
import { ToggleButton } from "../components";
import { Todo } from "../types";

const OptimisticUpdateViaCache = () => {
  const { data: post } = useQuery<Todo>({
    queryKey,
    queryFn: getTodoQueryFn,
  });

  const queryClient = useQueryClient();

  const { mutate: toggleFeature } = useMutation({
    mutationFn: completeTodoMutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const prevTodo = queryClient.getQueryData<Todo>(queryKey)!;
      const newTodo = { ...prevTodo, completed: variables };

      queryClient.setQueryData<Todo>(queryKey, newTodo);

      return { prevTodo, newTodo };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, context?.prevTodo);
      alert(error);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  const isCompleted = !!post?.completed;

  return (
    <div>
      <p>Optimistic Update Via Cache</p>
      <ToggleButton
        onClick={() => toggleFeature(!isCompleted)}
        checked={isCompleted}
      />
      <p>TODO is {isCompleted ? "finished" : "unfinished"}</p>
    </div>
  );
};

export default OptimisticUpdateViaCache;
