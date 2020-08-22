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

export async function createData(newNote) {
  const res = await axios.post(NOTE_URI, newNote)
  return res.data
}

export async function getDataById(key, id) {
  const res = await axios.get(`${NOTE_URI}/${id.id}`)
  return res.data
}

export async function updateDataById(content) {
  const res = await axios.put(`${NOTE_URI}/${content[0]}`, { text: content[1], title: content[2]})
  return res.data
} 