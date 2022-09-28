import { gql } from "@apollo/client";

export const ALL_TODO_LIST = gql`
  query AllTodoList {
    private {
      todoLists {
        id
        name
        color
        items {
          id
          name
          isDone
        }
      }
    }
  }
`;

export const TODO_LIST = gql`
  query TodoList($todoList: ID) {
    private {
      todoList(id: $todoList) {
        id
        name
        color
      }
    }
  }
`;

export const TODO_ITEM = gql`
  query TodoItem($todoItemId: ID) {
    private {
      todoItem(id: $todoItemId) {
        id
        name
        isDone
        todoList {
          id
          name
        }
      }
    }
  }
`;

export const ALL_TODO_ITEMS = gql`
  query TodoItems($todoList: ID) {
    private {
      todoItems(todoList: $todoList) {
        id
        name
        isDone
        todoList {
          id
          name
        }
      }
    }
  }
`;

export const ADD_TODO_LIST = gql`
  mutation AddTodoList($name: String, $color: String, $user: ID) {
    private {
      addTodoList(name: $name, color: $color, user: $user) {
        id
        name
      }
    }
  }
`;

export const SAVE_TODO_LIST = gql`
  mutation SaveTodoList($id: ID, $name: String, $color: String) {
    private {
      saveTodoList(id: $id, name: $name, color: $color) {
        id
        name
      }
    }
  }
`;

export const DELETE_TODO_LIST = gql`
  mutation DeleteTodoList($id: ID) {
    private {
      deleteTodoList(id: $id) {
        id
      }
    }
  }
`;

export const ADD_TODO_ITEM = gql`
  mutation AddTodoItem($name: String, $todoList: ID) {
    private {
      addTodoItem(name: $name, todoList: $todoList) {
        id
        name
      }
    }
  }
`;

export const SAVE_TODO_ITEM = gql`
  mutation SaveTodoItem($id: ID, $name: String) {
    private {
      saveTodoItem(id: $id, name: $name) {
        id
        name
      }
    }
  }
`;

export const DELETE_TODO_ITEM = gql`
  mutation DeleteTodoItem($id: ID) {
    private {
      deleteTodoItem(id: $id) {
        id
      }
    }
  }
`;

export const TOOGLE_TODO_ITEM = gql`
  mutation ToggleTodoItem($id: ID) {
    private {
      toggleTodoItem(id: $id) {
        id
      }
    }
  }
`;
