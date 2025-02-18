const loginValidation = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const emialRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emialRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    next();
};

const signupValidation = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (username.length < 4) {
        return res.status(400).json({ message: "Username must be at least 4 characters long" });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    next();
};

export { loginValidation }