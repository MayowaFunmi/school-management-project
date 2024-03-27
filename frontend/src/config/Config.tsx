export const baseUrl = "http://localhost:5294";
export const jwtKey = "this is a secret key for jsonwebtoken";

export const getAxiosConfig = () => {
    const token = localStorage.getItem("user");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
}

export const getAxiosUploadConfig = () => {
    const token = localStorage.getItem("user");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    }
}