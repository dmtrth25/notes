import { data } from './data.js'
import {
  renderData,
  renderSummary,
  renderArchivedNotes,
  extractData
} from './utils.js'

export const archivedArr = []
export const createNoteFromModal = (name, content, category) => {
  try {
    if (name && content && category) {
      const currentDate = new Date()
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })

      const parts = formattedDate.split('/')
      const day = parts[1]
      const month = parts[0]
      const year = parts[2]

      const newNote = {
        id: data.length + 1,
        name,
        time: `${day}/${month}/${year}`,
        content,
        category,
        dates: "",
        archived: false,
      }

      data.push(newNote)
      renderData()
      renderSummary()
    }
  } catch (error) {
    console.error('Error adding note:', error)
  }
}

export const removeNote = (id) => {
  try {
    const index = data.findIndex((n) => n.id === id)
    if (index === -1) return

    data.splice(index, 1)
    renderData()
    renderSummary()
  } catch (error) {
    console.error('Error while deleting a note:', error)
  }
}

export const editNote = (e) => {
  const dataId = e.target.dataset.id

  if (!dataId) {
    console.error('Data-id attribute not found in the event target')
    return
  }

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

  const newName = titleInput.value
  const newContent = contentInput.value
  const newCategory = categoryInput.value

  if (newContent && newCategory) {
    const newDates = extractData(newContent)
    note.name = newName
    note.content = newContent
    note.category = newCategory
    note.dates = newDates

    renderData()
    renderSummary()
    modal.style.display = 'none'
  }
}

export const archiveData = (id) => {
  try {
    const noteIndex = data.findIndex(item => item.id === id)

    const note = data[noteIndex]
    note.archived = true

    archivedArr.push(note)
    data.splice(noteIndex, 1)

    renderData()
    renderArchivedNotes()
    renderSummary()
  } catch (error) {
    console.error('Error while archiving a note:', error)
  }
}

export const unArchiveData = (id) => {
  try {
    const noteIndex = archivedArr.findIndex(item => item.id === id)

    const note = archivedArr[noteIndex]
    note.archived = false

    archivedArr.splice(noteIndex, 1)
    data.push(note)

    renderData()
    renderArchivedNotes()
    renderSummary()
  } catch (error) {
    console.error('Error while unarchiving a note:', error)
  }
}
