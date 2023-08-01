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
      const dates = extractData(content)
      const newNote = {
        id: data.length + 1,
        name,
        time: new Date().toLocaleString(),
        content,
        category,
        dates,
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

export const editNote = (id) => {
  try {
    const note = data.find(item => item.id === id)
    if (!note) return

    const newName = prompt('Edit your note:', note.name)
    const newContent = prompt('Edit your note:', note.content)
    const newCategory = prompt('Edit category (Task, Random Thought, Idea):', note.category)

    if (newContent && newCategory) {
      const newDates = extractData(newContent)
      note.name = newName
      note.content = newContent
      note.category = newCategory
      note.dates = newDates

      renderData()
      renderSummary()
    }
  } catch (error) {
    console.error('Error while editing a note:', error)
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
