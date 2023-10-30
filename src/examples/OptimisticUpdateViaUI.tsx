import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { completeTodoMutationFn, getTodoQueryFn } from "../api";
import { ToggleButton } from "../components";
import { Todo } from "../types";

const queryKey = ["todos", "1"];

const OptimisticUpdateViaUI = () => {
  const { data: todo } = useQuery<Todo>({
    queryKey,
    queryFn: getTodoQueryFn,
  });

  const queryClient = useQueryClient();

  const {
    mutate: toggleFeature,
    variables,
    isPending,
  } = useMutation({
    mutationFn: completeTodoMutationFn,
    onError: (error) => alert(error),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const isCompleted = isPending ? variables : todo?.completed;

  return (
    <div>
      <p>Optimistic Update Via UI</p>
      <ToggleButton
        onClick={() => toggleFeature(!isCompleted)}
        checked={!!isCompleted}
      />
      <p>TODO is {isCompleted ? "finished" : "unfinished"}</p>
    </div>
  );
};

export default OptimisticUpdateViaUI;
