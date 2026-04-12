import usermodel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    const existingUser = await usermodel.findOne({ email: normalizedEmail });
   if (existingUser) {
   return res.status(400).json({
    success: false,
    message: "User already exists"
  });
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usermodel.create({
      username,
      email:normalizedEmail,
      password: hashedPassword
    });
    let accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
    {
    expiresIn: "1d"
    }
);
    res.cookie("accessToken", accessToken , {
    httpOnly:true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
});
    res.status(200).json({
      success: true,
      data: user,
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
    const normalizedEmail = email.toLowerCase();
    const user = await usermodel.findOne({ email: normalizedEmail });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }
    let accessToken = jwt.sign({
    id: user._id,
    }, process.env.JWT_SECRET ,
    {
    expiresIn: "1d"
    }
)
    res.cookie("accessToken", accessToken , {
        httpOnly:true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
})
    
    res.status(200).json({
  success: true,
  data: user,
  token: accessToken,
  message: "User logged In successfully"
});

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
