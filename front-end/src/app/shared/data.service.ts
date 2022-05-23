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
  }

  search = (input): Promise<Todo[] | undefined | null> => {
    let params = Object.assign({}, {
      createdDate: undefined,
      userId: undefined,
    }, input)
    return new Promise((resolve, reject) => {
      this.todoServiceProxy.search(params).toPromise().then(res => {
        if (res) {
          this.todos = res
        } else {
          this.todos = []
        }
        console.log(res)
        resolve(this.todos)
      }).catch(error => {
        console.log('search has error: ', error)
        reject(error)
      })
    })
  }

  addTodo(todo: Todo): Promise<Todo[] | undefined | null> {
    // this.todos.push(todo)
    // let index = this.todos?.length - 1
    return new Promise((resolve, reject) => {
      this.todoServiceProxy.addTodo(todo).toPromise().then(res => {
        if (res) {
          this.todos.push(res)
        }
        resolve(this.todos)
      }).catch(error => {
        console.log('addTodo has error: ', error)
        reject(error)
      })
    })
  }

  updateTodo(index: number, updatedTodo: Todo): Promise<Todo[] | undefined | null> {
    return new Promise((resolve, reject) => {
      this.todoServiceProxy.updateTodo(updatedTodo).toPromise().then(res => {
        if (res) {
          this.todos[index] = res
        }
        resolve(this.todos)
      }).catch(error => {
        console.log('updateTodo has error: ', error)
        reject(error)
      })
    })
  }

  deleteTodo(taskId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.todoServiceProxy.deleteTodo(taskId).toPromise().then(res => {
        resolve(true)
      }).catch(error => {
        console.log('deleteTodo has error: ', error)
        resolve(false)
      })
    })
  }

  getStreak = () => {
    return new Promise((resolve, reject) => {
      this.todoServiceProxy.getStreak().toPromise().then(res => {
        resolve(true)
      }).catch(error => {
        console.log('deleteTodo has error: ', error)
        resolve(false)
      })
    })
  }
}
