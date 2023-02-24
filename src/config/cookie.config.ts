import { CookieOptions } from "express";

const cookieConfig: CookieOptions = {
  signed: true,
  path: '/',
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 14 * 24 * 60 * 60 * 1000
}

export default cookieConfig;