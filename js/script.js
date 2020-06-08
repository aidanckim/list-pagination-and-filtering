/***************
GLOBAL VARIABLES
****************/

const studentList = document.querySelectorAll('.student-item')
const numOfStudents = 10
const div = document.createElement('div')
const page = document.querySelector('.page')

/***************
DISPLAY STUDENTS
****************/

const showPage = (list, page) => {
  const startIndex = page * numOfStudents - numOfStudents
  const endIndex = page * numOfStudents

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = 'block'
    } else {
      list[i].style.display = 'none'
    }
  }
}

showPage(studentList, 1)

/***************
PAGINATION LINKS
****************/

const appendPageLinks = (list) => {
  const numOfPages = Math.ceil(list.length / numOfStudents)
  const ul = document.createElement('ul')
  div.className = 'pagination'
  page.appendChild(div)
  div.appendChild(ul)

  for (let i = 0; i < numOfPages; i++) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    ul.appendChild(li)
    li.appendChild(a)

    a.href = '#'
    a.textContent = i + 1

    if (i === 0) {
      a.className = 'active'
    }

    a.addEventListener('click', (e) => {
      const link = document.querySelectorAll('a')
      for (let i = 0; i < link.length; i++) {
        link[i].className = 'none'
      }
      e.target.className = 'active'
      showPage(list, e.target.textContent)
    })
  }
}

appendPageLinks(studentList)

/*********
SEARCH BAR
**********/

const searchDiv = document.createElement('div')
const input = document.createElement('input')
const button = document.createElement('button')
const header = document.querySelector('.page-header')
searchDiv.className = 'student-search'
input.placeholder = 'Search for students...'
button.textContent = 'Search'

searchDiv.appendChild(input)
searchDiv.appendChild(button)
header.appendChild(searchDiv)

/*********
NO RESULTS
**********/

const noResults = document.createElement('h2')
noResults.textContent = 'No results found... search again!'
page.appendChild(noResults)
noResults.style.display = 'none'

/*********************
FUNCTIONING SEARCH BAR
**********************/

function searchBar () {
  const userSearch = document.querySelector('input')
  const filter = userSearch.value.toUpperCase()
  for (let i = 0; i < studentList.length; i++) {
    const aLink = studentList[i].getElementsByTagName('h3')[0]
    const txtValue = aLink.textContent || aLink.innerText
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      studentList[i].style.display = ''
    } else {
      studentList[i].style.display = 'none'
    }
  }
}

/**********************
PAGINATE SEARCH RESULTS
***********************/

function paginateSearch () {
  const array = []
  for (let i = 0; i < studentList.length; i++) {
    if (
      input.value.length !== 0 &&
      studentList[i]
        .querySelector('h3')
        .textContent.toLowerCase()
        .includes(input.value.toLowerCase())
    ) {
      array.push(studentList[i])
    }
  }
  if (array.length === 0) {
    noResults.style.display = ''
  } else {
    noResults.style.display = 'none'
  }
  div.innerHTML = ''
  showPage(array, 1)
  appendPageLinks(array)
}

/*************
EVENT LISTENER
**************/

input.addEventListener('keyup', (e) => {
  e.preventDefault()

  if (input.value !== '') {
    searchBar()
    paginateSearch()
  } else {
    div.innerHTML = ''
    showPage(studentList, 1)
    appendPageLinks(studentList)
  }
})
