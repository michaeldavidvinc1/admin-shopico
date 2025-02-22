export const ROUTES = {
    LOGIN: "/login",
    DASHBOARD: "/",
    CATEGORY: "/category",
    CREATE_CATEGORY: "/category/create"
}

export const API_URL = {
    LOGIN: "/admin/auth/login",
    VERIFY_TOKEN: (token: string) => `/verify/token/${token}`,
    CATEGORY_CREATE: "/admin/category/create",
    GET_ALL_CATEGORY: "/admin/category",
    GET_SINGLE_CATEGORY: (slug: string) =>  `/admin/category/${slug}`,
    UPDATE_CATEGORY: (slug: string) =>  `/admin/category/${slug}`,
    DELETE_CATEGORY: (slug: string) =>  `/admin/category/${slug}/forceDelete`,
    DEACTIVATED_CATEGORY: (slug: string) =>  `/admin/category/${slug}/softDelete`,
    ACTIVATED_CATEGORY: (slug: string) =>  `/admin/category/${slug}/activated`,
}