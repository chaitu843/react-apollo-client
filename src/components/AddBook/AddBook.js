import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { Query, Mutation } from '@apollo/react-components';

import { flowRight as compose } from 'lodash';

import './AddBook.css';
import { getBooksQuery } from '../BooksList/BooksList';
const getAuthorsQuery = gql`
    {
        getAuthors {
            name
            id
        }
    }
`
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: Int!) {
        addBook(bookInfo : {name: $name, genre: $genre, authorId: $authorId}) {
            name
            id
        }
    }
`
class AddBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            genre: '',
            authorId: 'selectAuthor'
        }
    }

    clickHandler = (addBook) => {
        addBook({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: parseInt(this.state.authorId)
            },
             refetchQueries: [{
                query: getBooksQuery
            }]
        })

        this.setState({
            name: '',
            genre: '',
            authorId: 'selectAuthor'
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    displayAuthors = (authors) => authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>);

    render() {
        return (
            <Query query={getAuthorsQuery}>
                {
                    ({ loading, error, data }) => {
                        return <form className="add-book">
                            <div className="field">
                                <label htmlFor="bookName">Enter Name of the Book: </label>
                                <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} />
                            </div>

                            <div className="field">
                                <label htmlFor="bookGenre">Enter Genre of the Book: </label>
                                <input type="text" name="genre" value={this.state.genre} onChange={this.changeHandler} />
                            </div>

                            <div>
                                <label>Select Author of the Book: </label>
                                <select value={this.state.authorId} onChange={(e) => this.setState({
                                    authorId: e.target.value
                                })}>
                                    <option value="selectAuthor">Select Author</option>
                                    {loading ? <option>Loading...</option> : this.displayAuthors(data.getAuthors)}
                                </select>
                            </div>
                            <Mutation mutation = {addBookMutation}>
                                {
                                    (addBook, {loading, data, error}) => {
                                        return <button onClick={(e) => {
                                            e.preventDefault();
                                           this.clickHandler(addBook);
                                        }}> + </button>
                                    }
                                }
                            </Mutation>
                        </form>
                    }
                }
            </Query>
        )
    }
}

export default AddBook;
