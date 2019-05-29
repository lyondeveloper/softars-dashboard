module.exports = (req, res, next) => {
    const role = req.user.role;

    if (role === "admin") {
        next();
    } else {
        return res.status(401).json({
            err: "El usuario no tiene permisos para realizar esta acción"
        });
    }
};
