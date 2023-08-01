import { createNoteFromModal } from './notes.js'
import { editHandler, unArchiveHandler } from "./handlers.js"
import { renderData, renderSummary, renderArchivedNotes } from './utils.js'

const showArchived = document.getElementById('show-archived-btn')
const archivedTable = document.querySelector('.archived')

document.getElementById('add-note').addEventListener('click', () => {
  document.getElementById('add-note-modal').style.display = 'flex'
})

document.getElementById('close-button').addEventListener('click', () => {
  document.getElementById('add-note-modal').style.display = 'none'
})

document.getElementById('edit-close-button').addEventListener('click', () => {
  document.getElementById('edit-note-modal').style.display = 'none'
})

document.getElementById('add-note-button').addEventListener('click', () => {
  const name = document.getElementById('note-title').value
  const content = document.getElementById('note-content').value
  const category = document.getElementById('note-category').value
  createNoteFromModal(name, content, category)

  document.getElementById('note-title').value = ''
  document.getElementById('note-content').value = ''
  document.getElementById('note-category').value = ''

  document.getElementById('add-note-modal').style.display = 'none'
})

showArchived.addEventListener('click', () => {
  const computedStyle = getComputedStyle(archivedTable)

  if (computedStyle.display === 'none') {
    archivedTable.style.display = 'block'
    showArchived.textContent = 'Hide archived'
  } else {
    archivedTable.style.display = 'none'
    showArchived.textContent = 'Show archived'
  }
})

export const setupEventListeners = () => {
  const notesBody = document.getElementById('body')
  notesBody.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('edit-button')) {
      editHandler(event)
    }
  })

  const archivedBody = document.getElementById('archived')
  archivedBody.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('unarchive-button')) {
      unArchiveHandler(event)
    }
  })
}

const fns = () => {
  renderData()
  renderArchivedNotes()
  renderSummary()
  setupEventListeners()
}

fns()
