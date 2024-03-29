import { config } from "dotenv";

config();

// Port for the express server to listen on
export const port = process.env.PORT;

// API version for the project's API endpoints
export const apiVersion = process.env.API_VERSION || "/api/v1";

// Secret key for JWT (JSON Web Tokens) authentication
export const secretKey = process.env.SECRET_KEY || "project1";

// Expiry duration for JWT tokens (default: 365 days)
export const expiryIn = process.env.EXPIRY_IN || "365d";

// Expiry duration for verifying email (default: 1 day)
export const verifyEmailExpiryIn = process.env.VERIFY_EMAIL_EXPIRY_IN || "1d";

// Base URL for the client application (default: http://localhost:3000)
export const clientBaseUrl =
  process.env.CLIENT_BASE_URL || "http://localhost:3000";

// Base URL for the server (default: http://localhost:8000)
export const baseUrl = process.env.BASE_URL || "http://localhost:8000";

// Database connection congfig
export const database = process.env.DATABASE || "form_builder_project_db";

export const user = process.env.USER || "mist-dev";

export const pass = process.env.PASS || "sqlrookiedev";

export const host = process.env.HOST || "localhost";

// Expiry duration for password reset requests
export const resetExpiryIn = process.env.RESET_EXPIRY_IN || "2d";

// Token types for different purposes
export const tokenTypes = {
  ACCESS: "access",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
};

// Email sender's name or alias
export const emailName = process.env.EMAIL_NAME;
