const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (name, email, _id) => {
    const jwtKey = process.env.SECRET_KEY;
    return jwt.sign({ name, email, _id }, jwtKey, { expiresIn: "3d" })
}


const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email })

        if (user) return res.status(400).json("Ya existe un usuario con ese correo, intenta con otro");
        if (!name || !email || !password) return res.status(400).json("Todos los campos deben ser rellenados");
        if (!validator.isEmail(email)) return res.status(400).json("Este campo debe ser un correo electronico valido");
        if (!validator.isStrongPassword) return res.status(400).json("La contraseña debe ser mas robusta");

        user = new userModel({ name, email, password })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user.save();

        const token = createToken(user._id)
        res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


const getAllUsers = async (req, res) => {

    try {
        let users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const getUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


}

const loginUser = async (req, rest) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return rest.status(400).json("El usuario no existe");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return rest.status(400).json("Contraseña incorrecta, vuelve a intentar o prueba con Recuperar contraseña");

        const token = createToken(user.name, user.email, user._id);
        rest.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.log(error);
        rest.status(500).json(error);
    }
}


const decode =
    module.exports = { registerUser, getAllUsers, getUserById, loginUser };