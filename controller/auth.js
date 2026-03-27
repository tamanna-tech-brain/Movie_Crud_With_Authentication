import usermodel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const normalizedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usermodel.create({
      username,
      email:normalizedEmail,
      password: hashedPassword
    });
    let accessToken = jwt.sign({
    id: user._id,
    }, process.env.JWT_SECRET,
    {
    expiresIn: "15m"
    }
);

    res.cookie("accessToken", accessToken , {
    httpOnly:true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
});
    
    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function login(req, res) {
  try {
    const {  email, password } = req.body;

    if (!email || !password) {
      throw new Error("All fields are required");
    }
   const normalizedEmail = email.toLowerCase();
    const user = await usermodel.findOne({ email: normalizedEmail });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
     throw new Error("Invalid password");
    } 
    
    let accessToken = jwt.sign({
    id: user._id,
    }, process.env.JWT_SECRET ,
    {
    expiresIn: "15m"
    }
)
    res.cookie("accessToken", accessToken , {
    httpOnly:true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
})
    
    res.status(201).json({
      success: true,
      message: "User logged In successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
