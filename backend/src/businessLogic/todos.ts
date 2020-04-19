import * as uuid from 'uuid'
import * as AWS from 'aws-sdk'

import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodoAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
    return todoAccess.getAllTodos(userId)
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    const itemId = uuid.v4()

    return await todoAccess.createTodo({
        todoId: itemId,
        userId: userId,
        createdAt: new Date().toISOString(),
        done: false,
        ...createTodoRequest
    })
}

export async function updateTodo(todoId: string, updateTodoRequest: UpdateTodoRequest, userId: string): Promise<String> {
    return todoAccess.updateTodo(todoId, updateTodoRequest,  userId)
}

export async function deleteTodo(todoId: String, userId: string): Promise<String> {
    return todoAccess.deleteTodo(todoId, userId)
}

export async function updateAttachmentUrl(todoId: String, userId: string, attachmentUrl: string): Promise<String> {
    return todoAccess.updateAttachmentUrl(todoId, userId, attachmentUrl)
}