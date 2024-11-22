import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import "dotenv/config";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';

// Load the correct .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });
const app = express();

// Dynamic CORS Configuration
const allowedOrigins = [
    "http://localhost:3000", // Local development
  ];

// Dynamically allow Netlify branch deploy URLs
if (process.env.NODE_ENV === "production") {
    allowedOrigins.push(/\.netlify\.app$/); // Match all *.netlify.app subdomains
  }

app.use(cors(
    {   
        credentials: true,
        origin: (origin, callback) => {
      // Allow if no origin (e.g., server-to-server) or origin matches allowedOrigins
        if (!origin || allowedOrigins.some((o) => (typeof o === "string" ? o === origin : o.test(origin)))) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    }
)); 

const sessionOptions = {
    secret: process.env.production.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json()); 

AssignmentRoutes(app);
UserRoutes(app);
CourseRoutes(app);
EnrollmentsRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)
