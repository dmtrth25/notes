import { data } from "./data.js"
import { editNote, removeNote, archiveData, unArchiveData } from "./notes.js"

export const editHandler = (e) => {
  const dataId = e.target.dataset.id
  const currentId = parseInt(dataId)
  const note = data.find(item => item.id === currentId)

  if (!note) {
    console.error('Note not found for the given data-id')
    return
  }

  const modal = document.getElementById('edit-note-modal')
  const titleInput = document.getElementById('edit-note-title')
  const contentInput = document.getElementById('edit-note-content')
  const categoryInput = document.getElementById('edit-note-category')

  titleInput.value = note.name
  contentInput.value = note.content
  categoryInput.value = note.category

  modal.style.display = 'flex'

  const updateNoteButton = document.getElementById('update-note-button')
  updateNoteButton.dataset.id = currentId
  updateNoteButton.addEventListener('click', editNote)
}

export const removeHandler = (e) => {
  const dataId = e.target.dataset.id

  if (!dataId) {
    console.error('Data-id attribute not found in the event target')
    return
  }

  const currentId = parseInt(dataId)
  removeNote(currentId)
}

export const archiveHandler = (e) => {
  const dataId = e.target.dataset.id

  if (!dataId) {
    console.error('Data-id attribute not found in the event target')
    return
  }

  const currentId = parseInt(dataId)
  archiveData(currentId)
}

export const unArchiveHandler = (e) => {
  const dataId = e.target.dataset.id

  if (!dataId) {
    console.error('Data-id attribute not found in the event target')
    return
  }

  const currentId = parseInt(dataId)
  unArchiveData(currentId)
}
