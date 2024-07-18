import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";

function Homepage() {

    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000")
                const data = await response.json()
                setBooks(data)
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }

        fetchData()
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div>
            <>
                <main role="madin" style={{marginTop: 50}}>
                    <div className="container">
                        <div className="row" style={{paddingTop: "100px"}}>
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name, author, or tags"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>
                        <div className="container">
                            {/* Example row of columns */}
                            <div className="row" style={{paddingTop: "100px"}}>
                                {filteredBooks.length ? (
                                    filteredBooks.map(book => <BookCard key={book.id} book={book}/>)
                                ) : (
                                    <p>No Books!</p>
                                )}
                            </div>
                            <hr/>
                        </div>
                        {" "}
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