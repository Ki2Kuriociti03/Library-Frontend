import React, {useEffect, useState} from "react";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import BookCard from "../components/BookCard";

function Dashboard() {

    const [favouriteBooks, setFavouriteBooks] = useState([]);
    const [res, setRes] = useState("")
    const api = useAxios()
    const token = localStorage.getItem("authTokens")

    if (token) {
        const decode = jwtDecode(token)
        var user_id = decode.user_id
        var username = decode.username
        var full_name = decode.full_name
        var image = decode.image
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("http://127.0.0.1:8000/backend_api/favourites/");
                console.log(response.data)
                setFavouriteBooks(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [api]);



    return (
        <div><>
            <div className="container-fluid" style={{ paddingTop: "100px" }}>
                <div className="row">
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-12 pt-3 px-4">
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 className="h2">Профиль пользователя</h1>
                            <span>Привет, {username}!</span>
                        </div>
                        <h2>Мои книги</h2>
                            <div className="container">
                                {/* Example row of columns */}
                                <div className="row" style={{paddingTop: "100px"}}>
                            {favouriteBooks.length > 0 ? (
                                favouriteBooks.map(fav => <BookCard key={fav.book.id} book={fav.book}/>)
                            ) : (
                                <p>No favourite books available</p>
                            )}
                                </div>
                            </div>
                    </main>
                </div>
            </div>
            {/* Bootstrap core JavaScript
    ================================================== */}
            {/* Placed at the end of the document so the pages load faster */}
            {/* Icons */}
            {/* Graphs */}
        </>
        </div>
    )
}

export default Dashboard