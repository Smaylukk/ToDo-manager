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
        name: { type: GraphQLString, require: true },
        color: { type: GraphQLString, default: '' },
        user: {
            type: userType,
            require: true,
        },
        items: {
            type: new GraphQLList(todoItemType),
            require: true,
            resolve(source) {
                return TodoItem.find({ todoList: source.id })
                    .sort({ isDone: 1 })
                    .exec()
            },
        },
    }),
})

const todoItemType = new GraphQLObjectType({
    name: 'TodoItem',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString, require: true },
        isDone: { type: GraphQLBoolean },
        todoList: {
            type: todoListType,
            require: true,
            resolve(parents) {
                return TodoList.findById(parents.get('todoList')).exec()
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
            resolve(parents, args) {
                return TodoList.findById(args.id).exec()
            },
        },
        todoItem: {
            type: todoItemType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return TodoItem.findById(args.id).exec()
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
                return TodoList.find({ user: context.user.id })
                    .populate({
                        path: 'items',
                    })
                    .exec()
            },
        },
        todoItems: {
            type: new GraphQLList(todoItemType),
            args: {
                todoList: { type: GraphQLID },
            },
            resolve(parents, args) {
                return TodoItem.find({
                    todoList: args.todoList,
                })
                    .sort({
                        isDone: 1,
                    })
                    .exec()
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
                color: { type: GraphQLString },
                user: { type: GraphQLID },
            },
            resolve(source, { name, user, color }) {
                return TodoList.create({
                    name,
                    color,
                    user,
                })
            },
        },
        saveTodoList: {
            type: todoListType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                color: { type: GraphQLString },
            },
            resolve(source, { id, name, color }) {
                return TodoList.findByIdAndUpdate(id, {
                    name,
                    color,
                }).exec()
            },
        },
        deleteTodoList: {
            type: todoListType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(source, args) {
                return TodoList.findByIdAndDelete(args.id).exec()
            },
        },
        addTodoItem: {
            type: todoItemType,
            args: {
                name: { type: GraphQLString },
                isDone: { type: GraphQLBoolean },
                todoList: { type: GraphQLID },
            },
            resolve(source, { name, isDone, todoList }) {
                return TodoItem.create({
                    name,
                    isDone,
                    todoList,
                })
            },
        },
        saveTodoItem: {
            type: todoItemType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                isDone: { type: GraphQLBoolean },
            },
            resolve(source, { id, name, isDone }) {
                return TodoItem.findByIdAndUpdate(id, {
                    name,
                    isDone,
                }).exec()
            },
        },
        deleteTodoItem: {
            type: todoItemType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(source, args) {
                return TodoItem.findByIdAndDelete(args.id).exec()
            },
        },
        toggleTodoItem: {
            type: todoItemType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(source, args) {
                TodoItem.findById(args.id).then((item) => {
                    item.isDone = !item.isDone
                    item.save().then((item) => item)
                })
            },
        },
    }),
})

const publicNameSpaceMutation = new GraphQLObjectType({
    name: 'public',
    fields: () => ({
        register: {
            type: jwtType,
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
        auth: {
            type: jwtType,
            args: {},
            resolve(source, params, context) {
                return auth.check(context)
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
