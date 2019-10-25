import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import './BookDetail.css';
import { Query } from '@apollo/react-components';

const getBookQuery = gql`
query($id: Int!){
    getBook(id: $id){
        name
        genre
        author{
            books{
                id
                name
            }
        }
    }
}
`;

class BookDetail extends Component {

    displaySingleBook = (book) => <li key={book.id} id={book.id}>{book.name}</li>;

    render() {
        if (this.props.bookId == null) return <div className="book-details" style={{
            textAlign: 'center'
        }}>No Books Selected !</div>;
        else return (
            <Query query={getBookQuery} variables = {{
                id: parseInt(this.props.bookId)
            }}>
                {
                    ({ loading, error, data }) => {
                        if (!loading) {
                            return (
                                <div className="book-details">
                                    <h2> Book Details </h2>
                                    <h3> {data.getBook.name} </h3>
                                    <p> {data.getBook.genre} </p>
                                    <p> All other books by this author</p>
                                    <ul>
                                        {data.getBook.author.books.map(book => <li key={book.id}>{book.name}</li>)}
                                    </ul>
                                </div>
                            )
                        } else return <div> Loading .....</div>
                    }
                }
            </Query>
        )
    }
}

export default BookDetail;
