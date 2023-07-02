const Movie = require("../models/movieModel");
const movies = require("../movies.json");

const genres = require("../genre.json");

const Genre = require("../models/genreModel");

const getMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        console.log(genre, "genre");

        const genreOptions = await Genre.find().select("name _id");
        const genreIds = genreOptions.map((genre) => genre._id);

        genre === "All" ? (genre = [...genreIds]) : (genre = req.query.genre.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
            .where("genre")
            .in([...genre])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit)
            .populate("genre");

        const total = await Movie.countDocuments({
            genre: { $in: [...genre] },
            name: { $regex: search, $options: "i" },
        });

        const response = {
            total,
            page: page + 1,
            limit,
            genre: genreOptions,
            movies,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const insertMovies = async () => {
//     try {
//         const docs = await Movie.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((error) => console.log(error));

// const insetGenres = async () => {
//     try {
//         const docs = await Genre.insertMany(genres);
//         return Promise.resolve(docs);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };

// insetGenres()
//     .then((docs) => console.log(docs))
//     .catch((error) => console.log(error));

// const addGenres = async () => {
//     try {
//         for (const genre of genres) {
//             await Genre.create({ name: genre.name });
//         }
//         console.log("Genres added successfully!");
//     } catch (error) {
//         console.log("Error adding genres:", error);
//     }
// };

// addGenres();

module.exports = { getMovies };
