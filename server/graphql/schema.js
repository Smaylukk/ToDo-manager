const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLError } = require("graphql");
const TodoItem = require("../models/TodoItem");
const TodoList = require("../models/TodoList");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const auth = require("../services/auth");

//описуються типи GraphQL
const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString,  },
    password: { type: GraphQLString },
    todolists: {
      type: new GraphQLList(todoListType),
      resolve(source, args) {
        TodoList.find({ userID: source.id })
      }
    }
  }),
})

const jwtType = new GraphQLObjectType({
  name: 'JWT',
  fields: () => ({
    token: { type: GraphQLString },
  }),
})

const checkAuthType = new GraphQLObjectType({
  name: 'CheckAuth',
  fields: () => ({
    isAuth: { type: GraphQLBoolean },
  }),
})

const todoListType = new GraphQLObjectType({
  name: 'TodoList',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
    user: {
      type: userType,
      resolve(source, args) {
        User.findById(source.userID)
      }
    },
    todolists: {
      type: new GraphQLList(todoItemType),
      resolve(source, args) {
        TodoItem.find({ todolistID: source.id })
      }
    }
  }),
})

const todoItemType = new GraphQLObjectType({
  name: 'TodoItem',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isDone: { type: GraphQLBoolean },
    user: {
      type: userType,
      resolve(source, args) {
        User.findById(source.userID)
      }
    },
    todoList: {
      type: todoListType,
      resolve(source, args) {
        TodoList.findById(source.todolistID)
      }
    },
  }),
})

//описуються запити
const privateQueryNameSpace = new GraphQLObjectType({
  name: "private",
  fields: () => ({
    addTodoList: {
      type: todoListType,
      args: {
        name: { type: GraphQLString },
        userID: { type: GraphQLID },
      },
      resolve(source, { name, userID }) {
        return TodoList.create({
          name,
          userID
        });
      }
    }
  }),
});
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args, context, info) {
        return User.findById(args.id).exec()
      }
    },
    todoList: {
      type: todoListType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args, context, info) {
        return TodoList.findById(args.id).exec()
      }
    },
    todoItem: {
      type: todoItemType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args, context, info) {
        return TodoItem.findById(args.id).exec()
      }
    },
    users: {
      type: new GraphQLList(userType),
      args: { },
      resolve(parents, args, context, info) {
        return User.find().exec()
      }
    },
    todoLists: {
      type: new GraphQLList(todoListType),
      args: { },
      resolve(parents, args, context, info) {
        return TodoList.find().exec()
      }
    },
    todoItems: {
      type: new GraphQLList(todoItemType),
      args: { },
      resolve(parents, args, context, info) {
        return TodoItem.find().exec()
      }
    },
  }
})

const privateNameSpace = new GraphQLObjectType({
  name: "private",
  fields: () => ({
    addTodoList: {
      type: todoListType,
      args: {
        name: { type: GraphQLString },
        userID: { type: GraphQLID },
      },
      resolve(source, { name, userID }) {
        return TodoList.create({
          name,
          userID
        });
      }
    }
  }),
});

const publicNameSpace = new GraphQLObjectType({
  name: "public",
  fields: () => ({
    register: {
      type: userType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(source, { username, password }) {
        return auth.register(username, password);
      }
    },
    login: {
      type: jwtType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(source, { username, password }) {
        const token = auth.login(username, password);

        return token;
      }
    }
  })
});
//описуються мутації
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    public:{
      type: publicNameSpace,
      resolve: () => {
        return true
      }
    },
    private: {
      type: privateNameSpace,
      resolve(source, params, context, info) {
        //якщо в контексті нема даних користувача - далі не пускаємо
        if (!context.user) {
          return null
        }
      }
    }
  }
})

//описується схема GraphQL
module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})