/***************
GLOBAL VARIABLES
****************/

const studentList = document.querySelectorAll('.student-item')
const numOfStudents = 10

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
  const div = document.createElement('div')
  const page = document.querySelector('.page')
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
