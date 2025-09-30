import axiosInstance from "./axios";

// ========== AUTH ==========
export const signup = async (signupData) => {
    const response = await axiosInstance.post("/api/auth/signup", signupData);
    return response.data;
};

export const login = async (loginData) => {
    const response = await axiosInstance.post("/api/auth/login", loginData);
    return response.data;
};

export const logout = async () => {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
};

export const getAuthUser = async () => {
    try {
        const response = await axiosInstance.get("/api/auth/me");
        return response.data;
    } catch (error) {
        console.error("Error in getAuthUser:", error);
        return null;
    }
};

export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post("/api/auth/onboarding", userData);
    return response.data;
};

// ========== FRIENDS ==========
export const getUserFriends = async () => {
    const response = await axiosInstance.get("/api/users/friends");
    return response.data;
};

export const getRecommendedUsers = async () => {
    const response = await axiosInstance.get("/api/users");
    return response.data;
};

export const getOutgoingFriendReqs = async () => {
    const response = await axiosInstance.get("/api/users/outgoing-friend-requests");
    return response.data;
};

export const sendFriendRequest = async (userId) => {
    const response = await axiosInstance.post(`/api/users/friend-request/${userId}`);
    return response.data;
};

export const getFriendRequests = async () => {
    const response = await axiosInstance.get("/api/users/friend-requests");
    return response.data;
};

export const acceptFriendRequest = async (requestId) => {
    const response = await axiosInstance.put(`/api/users/friend-request/${requestId}/accept`);
    return response.data;
};

// ========== CHAT ==========
export const getStreamToken = async () => {
    const response = await axiosInstance.get("/api/chats/token");
    return response.data;
};
