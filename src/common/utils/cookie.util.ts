import { CookieOptions } from "express"

export const CookiesOptionsAccessToken = (): CookieOptions => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: "/",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000 // 15 minutes
})

export const CookiesOptionsRefreshToken = (): CookieOptions => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: "/",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 day
})