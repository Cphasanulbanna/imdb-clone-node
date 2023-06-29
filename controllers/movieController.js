const getMovies = async (req, res) => {
    try {
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMovies };
