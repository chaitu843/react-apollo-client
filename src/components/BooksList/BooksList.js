import React, { Component } from 'react'

import {gql} from 'apollo-boost';

import BookDetail from '../BookDetail/BookDetail';
import './BooksList.css';
import { Query } from '@apollo/react-components';

export const getBooksQuery = gql`
{
    getBooks{
        id
        name
    }
}
`;

class BooksList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             selected: null
        }
    }
    
    clickHandler = (e) => {
        this.setState({
            selected: e.target.id
        })
    }

    displaySingleBook = (book) => <li key={book.id} id={book.id} onClick = {this.clickHandler}>{book.name}</li>;

    render() {
        return (
            <Query query = {getBooksQuery}>
                {
                    ({loading, error, data}) => {
                        return   <div>
                        <ul className = "books-list">
                            {loading ? <li>Loading Books ... </li> : data.getBooks.map(book => this.displaySingleBook(book))}
                        </ul>
                        <div className='detail'><BookDetail bookId = {this.state.selected} /></div>
                        </div>
                    }
                }
            </Query>
        )
    }
}

export default BooksList;
