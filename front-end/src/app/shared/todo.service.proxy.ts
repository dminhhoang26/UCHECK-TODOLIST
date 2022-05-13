import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceProxy {
  headers: {
    'Content-Type': 'application/json',
    'dataType': 'json'
  }

  constructor() { }

  getAllTodos(): Promise<any | undefined | null> {
    let targetUrl = env.apiBaseUrl + `/api/task/search`
    return new Promise(async (resolve, reject) => {
      let response = null
      try {
        response = await fetch(targetUrl, {
          method: 'post',
          body: JSON.stringify({

          }),
          headers: this.headers
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  addTodo(todo: Todo) {
    let targetUrl = env.apiBaseUrl + `/api/task/create`
    return new Promise(async (resolve, reject) => {
      let response = null
      try {
        response = await fetch(targetUrl, {
          method: 'post',
          body: JSON.stringify(
            todo
          ),
          headers: this.headers
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  updateTodo(index: number, updatedTodo: Todo) {
    let targetUrl = env.apiBaseUrl + `/api/task/update`
    return new Promise(async (resolve, reject) => {
      let response = null
      try {
        response = await fetch(targetUrl, {
          method: 'post',
          body: JSON.stringify(
            updatedTodo
          ),
          headers: this.headers
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  deleteTodo(taskId: number) {
    let targetUrl = env.apiBaseUrl + `/api/task/delete`
    return new Promise(async (resolve, reject) => {
      let response = null
      try {
        response = await fetch(targetUrl, {
          method: 'post',
          body: JSON.stringify({
            id: taskId,
          }),
          headers: this.headers
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }
}
