import axiosInstance from "./axios";

// ========== AUTH ==========
export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
};

export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
};

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};

export const getAuthUser = async () => {
    try {
        const response = await axiosInstance.get("/auth/me"); // FIXED: removed extra /api
        return response.data;
    } catch (error) {
        console.error("Error in getAuthUser:", error);
        return null;
    }
};

export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
};

// ========== FRIENDS ==========
export const getUserFriends = async () => {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
};

export const getRecommendedUsers = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
};

export const getOutgoingFriendReqs = async () => {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data;
};

export const sendFriendRequest = async (userId) => {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`); // FIXED: removed extra /api
    return response.data;
};

export const getFriendRequests = async () => {
    const response = await axiosInstance.get("/users/friend-requests"); // FIXED: removed extra /api
    return response.data;
};

export const acceptFriendRequest = async (requestId) => {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`); // FIXED: removed extra /api
    return response.data;
};

// ========== CHAT ==========
export const getStreamToken = async () => {
    const response = await axiosInstance.get("/chats/token"); // FIXED: removed extra /api
    return response.data;
};
// filepath: c:\Users\Asus\Desktop\TalkSphere\frontend\src\lib\api.js