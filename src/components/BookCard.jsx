import React from "react";
import "./BookCard.css"
import {Link} from "react-router-dom";

function BookCard({ book }) {
    return (
        <div className='card-container' style={{marginLeft:"40px", marginRight:"40px", marginBottom:"30px"}}>
            <div className='image-container'>
                <img src={book.image} alt=""/>
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{book.name}</h3>
                </div>
                <div className="card-author">
                    {book.author}
                </div>
            </div>
            <div className="btn">
                <button>
                    <Link to="/">
                        View
                    </Link>
                </button>
            </div>
        </div>
    )
}
export default BookCard;