import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BooksContext = createContext();

export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm , setSearchTerm] = useState('');

    useEffect(()=>{
        const fetchBooks = async()=>{
            setLoading(true)
            try{
                const response = await axios.get("https://bookbazaarserver.onrender.com/books")
                setBooks(response.data)
            }
            catch (err){
                setError(err)
            }
            finally {
                setLoading(false)
            }
        };

        fetchBooks();

    },[])

    const filteredBooks = books.filter(book => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return(
            book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            book.author.toLowerCase().includes(lowerCaseSearchTerm) ||
            book.category.toLowerCase().includes(lowerCaseSearchTerm)
        )
    })

  return (
    <BooksContext.Provider value={{ books, loading, error, setSearchTerm, filteredBooks}}>
        {children}
    </BooksContext.Provider>
  )
}

export const useBooksContext = ()=>{
    return useContext(BooksContext)
}