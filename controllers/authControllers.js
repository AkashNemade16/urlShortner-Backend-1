import userData from '../models/users.js';
import bcrypt from 'bcryptjs'
import config from '../config/index.js';
import jwt from 'jsonwebtoken';
const {JWT_SECRET} = config;

//register users
// /user
export const registerUsers = async (req, res) => {

    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const user = await userData.findOne({ email });
        if (user) throw Error('User already exists');

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');

        const hash = bcrypt.hashSync(password, salt);
        console.log(password);
        if (!hash) throw Error('Something went wrong hashing the password');

        const newUser = new userData({
            name,
            email,
            password: hash
        });

        const savedUser = await newUser.save();
        if (!savedUser) throw Error('Something went wrong saving the user');

        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
            expiresIn: 3600
        });

        res.status(200).json({
            token,
            user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email
            }
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }

}

//Login Users
// /auth/login
export const validateUsers = async (req, res) => {

    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check for existing user
        const user = await userData.findOne({ email });
        if (!user) throw Error('User does not exist');

        console.log(password, user.password)
        const isMatch = bcrypt.compareSync(password, user.password)

        if (!isMatch) throw Error('Invalid credentials');

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
        if (!token) throw Error('Could not sign the token');

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }

}


//getUsers
// /getuser
export const getUsers = async (req,res) => {
    try {
        const user = await userData.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');
        res.json(user);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}