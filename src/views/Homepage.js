import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";

function Homepage() {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8000")
            const data = await response.json()
            setBooks(data)
        }

        fetchData()
    }, []);


    return (
        <div>
            <>
                <main role="madin" style={{ marginTop: 50 }}>
                    <div className="container">
                        {/* Example row of columns */}
                        <div className="row" style={{paddingTop: "100px"}}>
                            {books.length ? (
                                books.map(book => <BookCard key={book.id} book={book}/>)
                            ): (
                                <p>No Books!</p>
                            )}
                        </div>
                        <hr />
                    </div>{" "}
                    {/* /container */}
                </main>
                <footer className="container">
                    <p>© Company 2017-2018</p>
                </footer>
            </>

        </div>
    )
}

export default Homepage;