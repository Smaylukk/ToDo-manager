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
