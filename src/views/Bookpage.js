import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {BookService} from "../services/book.service";
import BookCard from "../components/BookCard";
import "./styles/Bookpage.css"
import axios from "axios";
import useAxios from "../utils/useAxios";
function Bookpage(){
    const {id} = useParams()
    const [book, setBook] = useState({})
    const [score, setScore] = useState(0)
    const [ratings, setRatings] = useState([])


    useEffect(() => {
        if(!id) return
        const fetchData = async () => {
            try {
                const data = await BookService.getById(id)
                setBook(data)

                const tokens = JSON.parse(localStorage.getItem("authTokens"))
                const token = tokens?.access
                if (!token) {
                    console.error("No auth token found")
                    return
                }

                const ratingsResponse = await axios.get(`http://localhost:8000/backend_api/ratings/list/?book=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRatings(ratingsResponse.data);
            } catch (error) {
                console.error("There was an error fetching the data!", error)
            }
        }
        fetchData()
    }, [id]);


    const handleAddToFavourites = async () => {
        const tokens = JSON.parse(localStorage.getItem("authTokens"));
        const token = tokens?.access;
        if (!token) {
            console.error("No auth token found")
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/backend_api/favourites/", {book: id}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("There was an error adding the book to favourites!", error)
        }
    }

    const handleRatingSubmit = async (e) => {
        e.preventDefault()
        const tokens = JSON.parse(localStorage.getItem("authTokens"));
        const token = tokens?.access;
        console.log("Token: ", token);
        if (!token) {
            console.error("No auth token found");
            return;
        }
        try {
            const ratingData = { book: id, rating: parseInt(score)}
            console.log("Sending rating data:", ratingData)
            const response = await axios.post("http://localhost:8000/backend_api/ratings/", ratingData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("Rating response: ", response.data)
            setRatings([...ratings, response.data])
            setScore(0)
        } catch (error) {
            console.error("There was an error submitting the rating!", error)
        }
    }

    const averageRating = ratings.length > 0
        ? (ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length).toFixed(1)
        : "No ratings yet";

    console.log("ratings:", ratings);

    if(!book) return <p>No Books...</p>

    return(
        <div className="app" style={{marginTop:"150px"}}>
            <div className="details">
                <div className="big-img">
                    <img src={`http://127.0.0.1:8000/${book.image}`} alt=""/>
                </div>
                <div className="box">
                    <div className="row">
                        <h2>{book.name}</h2>
                    </div>
                    <p>Автор: {book.author}</p>
                    <p>Год издания: {book.year}</p>
                    <p>Рейтинг: {averageRating}</p>
                    <p>ISBN: {book.isbn}</p>
                    <p>Количество: {book.quantity}</p>
                    <p>Жанры: {book.tags}</p>
                    <button type="button" className="fav" onClick={handleAddToFavourites}>В Избранное</button>
                    <form onSubmit={handleRatingSubmit}>
                        <input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            min="1"
                            max="5"
                            required
                        />
                        <button type="submit">Оценить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Bookpage