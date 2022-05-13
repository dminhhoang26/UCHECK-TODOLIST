import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { TodoServiceProxy } from './todo.service.proxy';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  todos: Todo[] = []
  constructor(private todoServiceProxy: TodoServiceProxy) { }

  // getAllTodos(): Promise<Todo[] | undefined | null> {
  getAllTodos() {
    return this.todos
    // return new Promise(async (resolve, reject) => {
    //   let response = null
    //   try {
    //     response = await this.todoServiceProxy.getAllTodos()
    //   } catch (error) {
    //     console.log('get all todos has error: ', error)
    //     resolve([])
    //   }

    //   if (response && Array.isArray(response)) {
    //     resolve(response.map(x => {
    //       return new Todo(
    //         x.text,
    //         x.completed,
    //         x.id,
    //         x.userId,
    //         x.description,
    //         x.priority,
    //         x.status,
    //         x.dueDate,
    //         x.createdDate,
    //       )
    //     }))
    //   } else {
    //     resolve([])
    //   }
    // })
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    // return this.todoServiceProxy.addTodo(todo)
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo
    // return this.todoServiceProxy.updateTodo(index, updatedTodo)
  }

  deleteTodo(taskId: number) {
    this.todos.splice(taskId, 1)
    // return this.todoServiceProxy.deleteTodo(taskId)
  }

}
