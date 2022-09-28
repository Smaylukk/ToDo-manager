import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ALL_TODO_LIST,
  DELETE_TODO_ITEM,
  DELETE_TODO_LIST,
  TODO_ITEM,
  TODO_LIST,
  TOOGLE_TODO_ITEM,
} from "../http/todoAPI";

export default function useTodo(
  onOpenList,
  onOpenItem,
  onOpenLoader,
  onCloseLoader
) {
  const [listId, setListId] = useState("");
  const [todoListData, setTodoListData] = useState({});
  const [itemId, setItemId] = useState(null);
  const [todoItemData, setTodoItemData] = useState({});
  //LIST
  const { refetch: updateTodoList } = useQuery(TODO_LIST, {
    variables: { todoList: listId },
    fetchPolicy: "no-cache",
  });
  const [deleteTodoList] = useMutation(DELETE_TODO_LIST, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });
  const HandleListEdit = useCallback(async (id) => {
    setListId(id);
    updateTodoList({ todoList: id }).then((res) => {
      const { data } = res;
      if (data.private.todoList) {
        setTodoListData(data.private.todoList);
        onOpenList();
      }
    });
    // eslint-disable-next-line
  }, []);
  const HandleListDelete = useCallback(async (id) => {
    onOpenLoader();
    deleteTodoList({ variables: { id } }).finally(() => onCloseLoader());
    // eslint-disable-next-line
  }, []);
  const HandleCreateTodoList = (e) => {
    e.preventDefault();

    setListId(null);
    setTodoListData(null);
    onOpenList();
  };

  // ITEM
  const { refetch: updateTodoItem } = useQuery(TODO_ITEM, {
    variables: { todoItemId: itemId },
    fetchPolicy: "no-cache",
  });
  const [deleteTodoItem] = useMutation(DELETE_TODO_ITEM, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });
  const [toggleTodoItem] = useMutation(TOOGLE_TODO_ITEM, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });

  const HandleItemCreate = useCallback(async (listId) => {
    setListId(listId);
    setItemId(null);
    setTodoItemData(null);
    onOpenItem();
    // eslint-disable-next-line
  }, []);
  const HandleItemEdit = useCallback(async (itemId) => {
    setItemId(itemId);
    updateTodoItem({ todoItemId: itemId }).then((res) => {
      const { data } = res;
      if (data.private.todoItem) {
        setTodoItemData(data.private.todoItem);
        onOpenItem();
      }
    });
    // eslint-disable-next-line
  }, []);
  const HandleItemDelete = useCallback(async (itemId) => {
    await deleteTodoItem({ variables: { id: itemId } });
    // eslint-disable-next-line
  }, []);
  const HandleItemToggle = useCallback(async (itemId) => {
    await toggleTodoItem({ variables: { id: itemId } });
    // eslint-disable-next-line
  }, []);

  return [
    listId,
    todoListData,
    itemId,
    todoItemData,
    HandleListEdit,
    HandleListDelete,
    HandleCreateTodoList,
    HandleItemEdit,
    HandleItemDelete,
    HandleItemCreate,
    HandleItemToggle,
  ];
}
