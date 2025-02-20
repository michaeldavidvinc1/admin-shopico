export const ROUTES = {
    LOGIN: "/login",
    DASHBOARD: "/",
    TEST: "/test"
}

export const API_URL = {
    LOGIN: "/admin/auth/login",
    VERIFY_TOKEN: (token: string) => `/verify/token/${token}`
}