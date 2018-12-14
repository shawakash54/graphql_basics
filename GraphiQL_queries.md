//getting a particular author
{
  author(id: "2"){
    name
    age
  }
}

//getting a particular book
{
  book(id: "2"){
    name
    genre
  }
}

//getting a book with it's author details
{
  book(id: "3"){
    name
    genre
    author{
    	name
      age
    }
  }
}

//getting a author with his list of books
{
  author(id: "1"){
    name
    age
    books{
      name
      genre
    }
  }
}

//getting the list of books
{
  books{
    name
    author{
      name
      age
    }
  }
}

//getting the list of authors
{
  authors{
    name
    books{
      name
      genre
    }
  }
}

