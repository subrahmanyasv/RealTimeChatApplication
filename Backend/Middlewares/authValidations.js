import Joi from "joi";

//Joi schema to match with requet body.
const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phoneno: Joi.number().required()
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


const loginValidation = (req, res, next) => {

    //Check if any field is empty.
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    //Check if any error occurs while validating the request body with Joi schema.
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const signupValidation = (req, res, next) => {

    //Check if any field is empty.
    if (!req.body.username || !req.body.email || !req.body.email || !req.body.phoneno) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }
    //Check if any error occurs while validating the request body with Joi schema.
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};


const isValidUserValidation = ( req, res , next ) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // Store user data in request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

export { loginValidation , signupValidation , isValidUserValidation }