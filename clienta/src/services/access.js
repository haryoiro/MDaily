import axios from 'axios'
import { NOTE_URI } from '../app/config'

export async function setToken(newToken) {
  const token = `Bearer ${newToken}`
  if (window.localStorage) {
    window.localStorage.setItem('token', token)
  }
}

export async function getAll() {
  const res = await axios.get(NOTE_URI)
  return res.data
}

export async function getDataById(key, { id }) {
  const res = await axios.get(`${NOTE_URI}/${id}`)
  return res.data
}

export async function updateDataById({ id, text }) {
  const res = await axios.put(`${NOTE_URI}/${id}`, { text })
  return res.data
}

export async function deleteDataById({ id }) {
  const res = await axios.delete(`${NOTE_URI}/${id}`)
  return res.data
}

export async function createNew() {
  const res = await axios.post(NOTE_URI)
  return res.data
}
