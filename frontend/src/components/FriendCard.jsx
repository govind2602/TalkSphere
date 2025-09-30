import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
    return (
        <div className="card bg-base-200 hover:shadow-md transition-shadow rounded-xl">
            <div className="card-body p-4">
                {/* USER INFO */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="avatar size-12 rounded-full overflow-hidden">
                        <img
                            src={friend.profilePicture || "/default-avatar.png"}
                            alt={friend.fullName}
                            className="w-12 h-12 object-cover"
                        />
                    </div>
                    <h3 className="font-semibold truncate capitalize">
                        {friend.fullName}
                    </h3>
                </div>

                {/* LANGUAGES */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="badge badge-secondary text-xs flex items-center gap-1">
                        {GetLanguageFlag(friend.nativeLanguage)}
                        Native: {capitalize(friend.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline text-xs flex items-center gap-1">
                        {GetLanguageFlag(friend.learningLanguage)}
                        Learning: {capitalize(friend.learningLanguage)}
                    </span>
                </div>

                {/* CHAT BUTTON */}
                <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
                    Message
                </Link>
            </div>
        </div>
    );
};
export default FriendCard;

// --- HELPERS ---
export function GetLanguageFlag(language) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className="h-3 w-4 object-cover inline-block"
            />
        );
    }
    return null;
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
