import axios from 'axios'
import { TODO_URI } from '../app/config'

export async function setToken(newToken) {
  const token = `Bearer ${newToken}`
  if (window.localStorage) {
    window.localStorage.setItem('token', token)
  }
}

export async function getTodo() {
  const res = await axios.get(TODO_URI)
  return res.data
}

export async function createTodo(newTodo) {
  const res = await axios.post(TODO_URI, newTodo)
  return res.data
}