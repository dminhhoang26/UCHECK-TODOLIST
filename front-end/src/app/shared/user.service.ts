import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { TodoServiceProxy } from './todo.service.proxy';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = {id: 1}
  constructor() { }

  // getAllTodos(): Promise<Todo[] | undefined | null> {
  getUser() {
    return this.user
  }

  addTodo(todo: Todo) {
    // this.todos.push(todo)
    // let index = this.todos?.length - 1
    // this.todoServiceProxy.addTodo(todo).toPromise().then(res => {
    //   if (res) {
    //     this.todos[index] = res
    //   } else {
    //     this.todos.splice(index, 1)
    //   }
    //   console.log(res, todo)
    // }).catch(error => {
    //   console.log('addTodo has error: ', error)
    // })
  }

  updateTodo(index: number, updatedTodo: Todo) {
    // this.todos[index] = updatedTodo
    // this.todoServiceProxy.updateTodo(index, updatedTodo).toPromise().then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log('updateTodo has error: ', error)
    // })
  }

  deleteTodo(taskId: number) {
    // this.todos.splice(taskId, 1)
    // this.todoServiceProxy.deleteTodo(taskId).toPromise().then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log('deleteTodo has error: ', error)
    // })
  }
}
