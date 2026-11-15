import { useState,useEffect } from "react";
import axios from "axios";
import "./favvendorlist.css";
import { jwtDecode } from "jwt-decode";
const API_URL=import.meta.env.VITE_API_URL

interface TokenPayload {
    emailid: string;
}

interface Vendor {
    emailid: string;
    name: string;
    contact: string;
    business: string;
    city: string;
    area: string;
    address: string;
    shoppicurl: string;
    selcate:string[];
    service:string[];
}

function Favorites() {
    const [citizenEmail, setCitizenEmail] = useState("");
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(false);
   const [rating, setRating] = useState(0);
    // Fetch favourite vendors
    async function fetchFavorites() {
        if (!citizenEmail.trim()) { //We use .trim() to remove extra spaces from the beginning and end of a string.
            alert("Please enter your email ID");
            return;
        }

        try {
            setLoading(true);

            const resp = await axios.post(
              `${API_URL}/citizendashboardrouter/fetchFavorites`,
                {
                    citizensemailid: citizenEmail
                }
            );

            if (resp.data.status) {
                setVendors(resp.data.msg);
            } else {
                setVendors([]);
            }
        } catch (err) {
            console.log("Error fetching favourites:", err);
            alert("Unable to fetch favourite vendors");
        } finally {
            setLoading(false);
        }
    }

    // Remove a vendor from favourites
    async function removeFavorite(vendor: Vendor) {
        try {
            const resp = await axios.post(
            `${API_URL}/citizendashboardrouter/removeFavorite`,
                {
                    citizensemailid: citizenEmail.trim(),
                    vendorsemailid: vendor.emailid
                }
            );

            if (resp.data.status) {
                setVendors(prev =>
                    prev.filter(item => item.emailid !== vendor.emailid)
                );
            }
        } catch (err) {
            console.log("Error removing favourite:", err);
            alert("Unable to remove vendor from favourites");
        }
    }



async function handleRating(vendor: Vendor, star: number) {
    try {
        const resp = await axios.post(
      `${API_URL}/vendorrouter/rate-vendor`,
            {
                emailid: vendor.emailid,
                rating: star
            }
        );

        if (resp.data.status) {
            setRating(star);
        }
    } catch (err) {
        console.log(err);
            alert("Unable to submit rating");
    }
}

useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
        let decoded = jwtDecode<TokenPayload>(token);
//Here, <TokenPayload> tells TypeScript what structure to expect in the decoded token.
        setCitizenEmail(decoded.emailid);
    }
}, []);


    return (
        <div className="favorites-page">
            <h1>My Favourite Vendors</h1>

            {/* Citizen email textbox */}
            <div className="favorites-search">
                <input
                    type="email"
                    placeholder="Enter your email ID"
                    value={citizenEmail}
                    onChange={(e) => setCitizenEmail(e.target.value)}
                />

                <button onClick={fetchFavorites}>
                    Show Favourites
                </button>
            </div>

            {loading && <p className="no-favorites">Loading favourites...</p>}

            {!loading && vendors.length === 0 && (
                <p className="no-favorites">
                    Enter your email ID to see your favourite vendors.
                </p>
            )}

            {/* Favourite vendor cards */}
            <div className="favorites-grid">
                {vendors.map((vendor) => (
                    <div className="vendor-card" key={vendor.emailid}>
                        {vendor.shoppicurl &&
                            vendor.shoppicurl !== "nopic.jpg" && (
                                <img
                                    src={vendor.shoppicurl}
                                    alt={vendor.business || "Vendor"}
                                />
                            )}

                        <div className="vendor-details">
                            <div className="vendor-title-row">
                                <h2>
                                    {vendor.business || vendor.name || "Vendor"}
                                </h2>
<strong>  Remove from Wishlist </strong>
                                <button
                                 type="button"
                                    className="like-button liked"
                                    onClick={() => removeFavorite(vendor)}
                                    aria-label="Remove from favourites"
                                    title="Remove from favourites"
                                >
                                    ♥
                                </button>
                            </div>

                            <p>
                                <strong>Vendor Name:</strong>{" "}
                                {vendor.name || "Not provided"}
                            </p>

                            <p>
                                <strong>Email ID:</strong>{" "}
                                {vendor.emailid}
                            </p>

                            <p>
                                <strong>Contact:</strong>{" "}
                                {vendor.contact || "Not provided"}
                            </p>

                            <p>
                                <strong>City:</strong>{" "}
                                {vendor.city || "Not provided"}
                            </p>

                            <p>
                                <strong>Area:</strong>{" "}
                                {vendor.area || "Not provided"}
                            </p>

                            <p>
                                <strong>Address:</strong>{" "}
                                {vendor.address || "Not provided"}
                            </p>

                            <p>
    <strong>Selected Services:</strong>{" "}
    {Array.isArray(vendor.selcate)
        ? vendor.selcate.join(", ")
        : vendor.selcate || "Not provided"}
</p>

<p>
    <strong>Liked For:</strong>{" "}
    {vendor.service || "Not provided"}
</p>

{[1, 2, 3, 4, 5].map((star) => (
    <button
        key={star}
        onClick={() => handleRating(vendor, star)}
        style={{
            color: star <= rating ? "gold" : "gray",
            background: "none",
            border: "none",
            fontSize: "28px",
            cursor: "pointer"
        }}
    >
        {star <= rating ? "★" : "☆"}
    </button>
))}


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;