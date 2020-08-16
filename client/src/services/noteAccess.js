import axios from 'axios'
import { NOTE_URI } from '../app/config'

export async function setToken(newToken) {
  const token = `Bearer ${newToken}`
  if (window.localStorage) {
    window.localStorage.setItem('token', token)
  }
}

export async function getNote() {
  const res = await axios.get(NOTE_URI)
  return res.data
}

export async function createNote(newNote) {
  const res = await axios.post(NOTE_URI, newNote)
  return res.data
}