import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
    const { data: friends, isLoading, error } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    if (isLoading) return <div className="p-8 text-center">Loading friends...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Failed to load friends.</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Your Friends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friends && friends.length > 0 ? (
                    friends.map(friend => (
                        <FriendCard key={friend._id} friend={friend} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-400">
                        You have no friends yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsPage;