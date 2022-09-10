const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
} = require('graphql')
const TodoItem = require('../models/TodoItem')
const TodoList = require('../models/TodoList')
const User = require('../models/User')
require('bcrypt')
require('jsonwebtoken')
const auth = require('../services/auth')

// TYPE GraphQL
const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        //password: { type: GraphQLString },
    }),
})

const jwtType = new GraphQLObjectType({
    name: 'JWT',
    fields: () => ({
        token: { type: GraphQLString },
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
            resolve(source) {
                User.findById(source.user)
            },
        },
        items: {
            type: new GraphQLList(todoItemType),
            resolve(source) {
                TodoItem.find({ todoList: source.id })
            },
        },
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
            resolve(source) {
                User.findById(source.user)
            },
        },
        todoList: {
            type: todoListType,
            resolve(source) {
                TodoList.findById(source.todoList)
            },
        },
    }),
})

//QUERY
const privatNameSpaceQuery = new GraphQLObjectType({
    name: 'privateQuery',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return User.findOne({ id: args.id }).exec()
            },
        },
        todoList: {
            type: todoListType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args, context) {
                return TodoList.findById({
                    user: context.user.id,
                    id: args.id,
                }).exec()
            },
        },
        todoItem: {
            type: todoItemType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args, context) {
                return TodoItem.findById({
                    user: context.user.id,
                    id: args.id,
                }).exec()
            },
        },
        users: {
            type: new GraphQLList(userType),
            args: {},
            resolve() {
                return User.find().exec()
            },
        },
        todoLists: {
            type: new GraphQLList(todoListType),
            args: {},
            resolve(parents, args, context) {
                return TodoList.find({ user: context.user.id }).exec()
            },
        },
        todoItems: {
            type: new GraphQLList(todoItemType),
            args: {},
            resolve(parents, args, context) {
                return TodoItem.find({ user: context.user.id }).exec()
            },
        },
    },
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        private: {
            type: privatNameSpaceQuery,
            resolve(source, params, context) {
                //якщо в контексті нема даних користувача - далі не пускаємо
                if (!context.user) {
                    return null
                }
                return true
            },
        },
    },
})

// MUTATION
const privateNameSpaceMutation = new GraphQLObjectType({
    name: 'private',
    fields: () => ({
        addTodoList: {
            type: todoListType,
            args: {
                name: { type: GraphQLString },
                user: { type: GraphQLID },
            },
            resolve(source, { name, user }) {
                return TodoList.create({
                    name,
                    user,
                })
            },
        },
    }),
})

const publicNameSpaceMutation = new GraphQLObjectType({
    name: 'public',
    fields: () => ({
        register: {
            type: userType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(source, { username, password }) {
                return auth.register(username, password)
            },
        },
        login: {
            type: jwtType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(source, { username, password }) {
                return auth.login(username, password)
            },
        },
    }),
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        public: {
            type: publicNameSpaceMutation,
            resolve: () => {
                return true
            },
        },
        private: {
            type: privateNameSpaceMutation,
            resolve(source, params, context) {
                //якщо в контексті нема даних користувача - далі не пускаємо
                if (!context.user) {
                    return null
                }
                return true
            },
        },
    },
})

//SCHEMA GraphQL
module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})
