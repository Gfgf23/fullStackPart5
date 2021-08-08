describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST','http://localhost:3003/api/users',{ username:'root',name:'Superuser',password:'salainen' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
	  cy.get('#password').type('salainen')
	  cy.get('button').click()
	  
	  cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
	  cy.get('#password').type('wrong')
	  cy.get('button').click()
	  
	  cy.contains('login')
     })

  })
  
   describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'root', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').parent().find('button').as('createBlogButton')
	  cy.get('@createBlogButton').click()
	  cy.get('#title').type('new title')
	  cy.get('#author').type('new author')
	  cy.get('#url').type('New Url')
	  cy.contains('create new blog').parent().find('button').as('createButton')
	  cy.get('@createButton').click()
	  cy.wait(3000)
	  cy.contains('new title new author')
    })
  })

})