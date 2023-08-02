import { archivedArr } from "./notes.js"
import { data } from "./data.js"
import {
  archiveHandler,
  removeHandler,
  editHandler,
  unArchiveHandler
} from "./handlers.js"

export const extractData = (value) => {
  const regex = /\d{1,2}-\d{1,2}-\d{4}/g
  return value.match(regex) || []
}

export const renderData = () => {
  const body = document.getElementById('body')
  body.innerHTML = ''

  data.forEach((note) => {
    const row = document.createElement('tr')
    const datesColumn = document.createElement('td')
    const datesList = extractData(note.content)
    datesColumn.textContent = datesList.join(', ')

    row.innerHTML = `
      <td>${note.time}</td>
      <td>${note.name}</td>
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${note.dates}</td>
      <td class="actions">
        <button data-id="${note.id}" class="button action-button edit-button">Edit</button>
        <button data-id="${note.id}" class="button action-button delete-button">Remove</button>
        <button data-id="${note.id}" class="button action-button archive-button">Archive</button>
      </td>
    `
    const editButtons = row.querySelectorAll('.edit-button')
    editButtons.forEach(button => {
      button.removeEventListener('click', editHandler)
      button.addEventListener('click', editHandler)
    })

    const archiveButtons = row.querySelectorAll('.archive-button')
    archiveButtons.forEach(button => {
      button.removeEventListener('click', archiveHandler)
      button.addEventListener('click', archiveHandler)
    })

    const deleteButtons = row.querySelectorAll('.delete-button')
    deleteButtons.forEach(button => {
      button.removeEventListener('click', removeHandler)
      button.addEventListener('click', removeHandler)
    })

    body.appendChild(row)
  })
}

export const renderArchivedNotes = () => {
  const body = document.getElementById('archived')
  body.innerHTML = ''

  archivedArr.forEach((note) => {
    const row = document.createElement('tr')
    const datesColumn = document.createElement('td')
    const datesList = extractData(note.content)
    datesColumn.textContent = datesList.join(', ')

    row.innerHTML = `
      <td>${note.time}</td>
      <td>${note.name}</td>
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${note.dates}</td>
      <td class="actions">
        <button data-id="${note.id}" class="button action-button unarchive-button">Unarchive</button>
      </td>
    `

    const unarchiveButtons = row.querySelectorAll('.unarchive-button')
    unarchiveButtons.forEach(button => {
      button.removeEventListener('click', unArchiveHandler)
      button.addEventListener('click', unArchiveHandler)
    })

    body.appendChild(row)
  })
}

export const renderSummary = () => {
  const summaryBody = document.getElementById('summary')
  summaryBody.innerHTML = ''

  const categories = ['Task', 'Random Thought', 'Idea']

  const summaryData = categories.reduce((acc, category) => {
    const activeNotesCount = data.filter((note) => note.category === category && !note.archived).length
    const archivedNotesCount = archivedArr.filter((note) => note.category === category).length

    acc.push({ category, activeNotesCount, archivedNotesCount })
    return acc
  }, [])

  summaryData.forEach((summaryItem) => {
    const { category, activeNotesCount, archivedNotesCount } = summaryItem
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${category}</td>
      <td>${activeNotesCount}</td>
      <td>${archivedNotesCount}</td>
    `

    summaryBody.appendChild(row)
  })
}

