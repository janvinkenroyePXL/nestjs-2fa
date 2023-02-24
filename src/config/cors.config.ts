import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const corsConfig: CorsOptions = {
  origin: ["https://localhost:3000"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
}

export default corsConfig;