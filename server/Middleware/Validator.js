import bcrypt from 'bcrypt';

class Validator {
  static validateInput = (req, res, next) => {
    const { password, email } = req.body;
    // Password must contain at least one uppercase letter, one lowercase letter, and one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    
    if (!password || !email) {
      return res.status(400).json({
        error: "Missing input fields.",
      });
    }
    
    if (password.length < 6 || password.length > 8) {
      return res.status(400).json({
        error: "Password must be 6 to 8 characters in length.",
      });
    }
    
    // if (!regex.test(password)) {
    //   return res.status(400).json({
    //     error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    //   });
    // }
    
    // Add more validation rules as necessary
    next();
  }

  static comparePassword = async (plaintextPassword, hashedPassword) => {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
  }

  static hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  }
}

export { Validator };
