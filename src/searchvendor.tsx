
import { useEffect, useState } from "react";
import axios from "axios";
import "./Eventsinfo.css";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    emailid: string;
}
const eventList = [
    {
        event: "Wedding",
        services: [
            "Photographer",
            "Decoration",
            "Catering",
            "Makeup Artist",
            "Florist",
            "DJ",
            "Venue",
            "Mehndi Artist"
        ]
    },
    {
        event: "Birthday",
        services: [
            "Photographer",
            "Decoration",
            "Catering",
            "Cake",
            "DJ",
            "Venue"
        ]
    },
    {
        event: "Engagement",
        services: [
            "Photographer",
            "Decoration",
            "Catering",
            "Makeup Artist",
            "Florist",
            "Mehndi Artist"
        ]
    },
    {
        event: "Anniversary",
        services: [
            "Photographer",
            "Decoration",
            "Catering",
            "Cake",
            "Florist"
        ]
    },
    {
        event: "Holi",
        services: [
            "Photographer",
            "Decoration",
            "Catering",
            "DJ"
        ]
    },
    {
        event: "Diwali",
        services: [
            "Decoration",
            "Lighting",
            "Catering",
            "Photographer",
            "Florist"
        ]
    },
    {
        event: "Festival",
        services: [
            "Decoration",
            "Lighting",
            "Catering",
            "DJ",
            "Photographer"
        ]
    },
    {
        event: "CorporateEvent",
        services: [
            "Photographer",
            "Catering",
            "Venue",
            "Decoration",
            "DJ"
        ]
    }
];

interface Vendor {
  
    emailid: string;
    name: string;
    contact: string;
    business: string;
    area: string;
    address: string;
    city: string;
    estd: string | number;
    website: string;
    insta: string;
   
    selcate: string[] ;
    shoppicurl: string;
    certpicurl: string;
    totalSum:number;
    count:number;
}
function getCategories(vendor: Vendor): string {
    const cats = vendor.selcate;

    return cats.join(", ") || "Not provided";//join(", ") takes all the elements of an array and combines them into one string, putting a comma and a space between each element.
}

function Eventsinfo() {
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");
    const [selectedService, setSelectedService] = useState("");

    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

const [citizenEmail, setCitizenEmail] = useState("");
const [likedVendors, setLikedVendors] = useState<string[]>([]);


    const selectedEventData = eventList.find(
        (item) => item.event === selectedEvent
    );

    // Fetch cities when the page loads.
    useEffect(() => { //hook
        async function getCities() {
            try {
                const resp = await axios.post(
                    "http://localhost:2010/vendorrouter/fetchCities"
                );

                if (resp.data.status) {
                    setCities(resp.data.msg);
                }
            } catch (err) {
                console.log("Error fetching cities:", err);
            }
        }

        getCities();
    }, []); 

    // Fetch matching vendors whenever the city, event
    // or service selection changes.
    useEffect(() => {
        if (!selectedCity || !selectedEvent || !selectedService) {
            setVendors([]);
            setError("");
            setLoading(false);
            return;
        }

        let cancelled = false;//It prevents an old search result from updating your screen when the user has already changed their selection.like i was earlier searching dj in patiala but the search was show so i changed it to amritsar now to usestate changes the cancelled to true and so now we will get amritsars result and not patilas

        async function searchVendors() {
            setLoading(true);
            setError("");
            setVendors([]);

            try {
                  const token = localStorage.getItem("token");
                const resp = await axios.post(
                    "http://localhost:2010/vendorrouter/findVendors",
                    {
                        city: selectedCity,
                      
                        service: selectedService
                    },
                      {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
                );

                if (cancelled) return;

                if (resp.data.status) {
                    setVendors(resp.data.msg);
                } else {
                    setVendors([]);
                    setError("Unable to find vendors.");
                }
            } catch (err) {
                if (cancelled) return;

                console.log("Error fetching vendors:", err);
                setVendors([]);
                setError("Unable to fetch vendors. Please try again.");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        searchVendors();

        return () => {
            cancelled = true;
        };
    }, [selectedCity, selectedEvent, selectedService]);



    //=======================================

async function saveLike(vendor: Vendor) {
    if (!citizenEmail.trim()) {
        alert("Please enter your email ID first");
        return;
    }

    let fd = new FormData();
    fd.append("citizensemailid", citizenEmail);
    fd.append("vendorsemailid", vendor.emailid);
    fd.append("service", selectedService);

    try {
        let resp;

        if (likedVendors.includes(vendor.emailid)) {
            // Remove vendor from wishlist
            resp = await axios.post(
                "http://localhost:2010/citizendashboardrouter/removeFavorite",
                fd
            );

            if (resp.data.status) {
                setLikedVendors(
                    likedVendors.filter(
                        email => email !== vendor.emailid
                    )
                );
            }
        } else {
            // Add vendor to wishlist
            resp = await axios.post(
                "http://localhost:2010/citizendashboardrouter/saveLike",
                fd
            );

            if (resp.data.status) {
                setLikedVendors([
                    ...likedVendors,
                    vendor.emailid
                ]);
            }
        }

        alert(JSON.stringify(resp.data.msg));

    } catch (err) {
        console.log("Axios error:", err);
        alert("Request failed. Check the browser console.");
    }
}

useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
        let decoded = jwtDecode<TokenPayload>(token);

        setCitizenEmail(decoded.emailid);
    }
}, []);


    return (
        <div className="events-page">
            <h1>Find Event Vendors</h1>

      <div className="events-layout">
 <div className="events-sidebar">
                <div className="events-form">
                {/* City dropdown */}
                <div className="form-group">
                    City

                    <select
                        value={selectedCity}
                        onChange={(e) =>
                            setSelectedCity(e.target.value)
                        }
                        required
                    >
                        <option value="">Select City</option>

                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Event dropdown */}
                <div className="form-group">
                    Event

                    <select
                        value={selectedEvent}
                        onChange={(e) => {
                            setSelectedEvent(e.target.value);
                            setSelectedService("");
                            setVendors([]);
                        }}
                        required
                    >
                        <option value="">Select Event</option>

                        {eventList.map((item) => (
                            <option
                                key={item.event}
                                value={item.event}
                            >
                                {item.event}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Service dropdown */}
                {selectedEventData && (
                    <div className="form-group">
                       Event  Service

                        <select
                            value={selectedService}
                            onChange={(e) =>
                                setSelectedService(e.target.value)
                            }
                            required
                        >
                            <option value="">Select Category</option>

                            {selectedEventData.services.map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>
                    </div>
                )}


                <div className="citizen-email-box">
    <label htmlFor="citizenEmail">Your Email ID</label>

    <input
        type="email"
        id="citizenEmail"
        placeholder="Enter your email ID"
        value={citizenEmail}
        onChange={(e) => setCitizenEmail(e.target.value)}
        required
    />
</div>
            </div></div>
</div>


   <div className="events-results">
            {/* Selected search details */}
            {selectedCity && selectedEvent && selectedService && (
                <h2 className="results-heading">
                    {selectedService}  in {selectedCity}
                </h2>
            )}

            {loading && (
                <p className="search-message">
                    Finding ...
                </p>
            )}

            {error && (
                <p className="search-message error-message">
                    {error}
                </p>
            )}

            {!loading &&
                !error &&
                selectedCity &&
                selectedEvent &&
                selectedService &&
                vendors.length === 0 && (
                    <p className="search-message">
                        No vendors found for {selectedService} in {selectedCity}.
                    </p>
                )}

 <div className="vendors-grid">
                {vendors.map((vendor) => (
                    <div className="vendor-card" key={vendor.emailid}>




            {/* Separate card for every matching vendor */}
        
                   

            {/* Left side: Shop image */}
            <div className="vendor-image-side">
                {vendor.shoppicurl &&
                    vendor.shoppicurl !== "nopic.jpg" && (
                        <>
                            <h3>Shop Picture</h3>
                            <img
                                src={vendor.shoppicurl}
                                alt={"pic not available"}
                                className="vendor-image"
                            />
                        </>
                    )}
            </div>

                        <div className="vendor-details">
                            <h2>{vendor.business || "Business name not provided"}</h2>

                            <h3>Personal Details</h3>

                            <p>
                                <strong>Vendor Name:</strong>{" "}
                                {vendor.name || "Not provided"}
                            </p>

                            <p>
                                <strong>Email ID:</strong>{" "}
                                {vendor.emailid || "Not provided"}
                            </p>

                            <p>
                                <strong>Contact Number:</strong>{" "}
                                {vendor.contact || "Not provided"}
                            </p>

                            <h3>Business Details</h3>

                            <p>
                                <strong>Business Name:</strong>{" "}
                                {vendor.business || "Not provided"}
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
                                <strong>Full Address:</strong>{" "}
                                {vendor.address || "Not provided"}
                            </p>

                            <p>
                                <strong>Established In:</strong>{" "}
                                {vendor.estd || "Not provided"}
                            </p>

                            <p>
                                <strong>Registered Categories:</strong>{" "}
                                {getCategories(vendor)}
                            </p>

                            <p>
                                <strong>Selected Service:</strong>{" "}
                                {selectedService}
                            </p>

                            <h3>Online Presence</h3>

                            <p>
                                <strong>Website:</strong>{" "}
                                {vendor.website ? (
                                    <a
                                        href={vendor.website}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {vendor.website}
                                    </a>
                                ) : (
                                    "Not provided"
                                )}
                            </p>

                            <p>
                                <strong>Instagram:</strong>{" "}
                                {vendor.insta ? (
                                    <a
                                        href={
                                            vendor.insta.startsWith("http")
                                                ? vendor.insta
                                                : `https://www.instagram.com/${vendor.insta.replace("@", "")}/`
                                        }
                                        target="_blank"   //It opens the link in a new browser tab instead of replacing your current website.
                                        rel="noreferrer"/*rel stands for relationship. It tells the browser how the current page relates to the linked page.
                                    prevents the destination website from receiving referrer information and also provides protection against access through window.opener.  
                                    in this case referrer is me lets say the link is of rahul and the customer could reach rahuls,s website using my website
                                    so im the referrer and if nonreferrer is not there then wont know that the customer came to his website through me  Referer: https://events.com/vendors now rahul knows this*/
                                    >
                                        {vendor.insta}
                                    </a>
                                ) : (
                                    "Not provided"
                                )}
                            </p>

        <div className="vendor-actions">

        <div className="vendor-rating">
            <strong>Rating</strong>

            {vendor.count > 0
                ? `⭐ ${(vendor.totalSum / vendor.count).toFixed(1)} (${vendor.count} ratings)`
                : "No ratings yet"}
        </div>

        <button
            className="like-btn"
            onClick={() => saveLike(vendor)}
        >
            {likedVendors.includes(vendor.emailid) ? "Liked " : "Like "}
            <span style={{
                color: likedVendors.includes(vendor.emailid) ? "red" : "gray"
            }}>♥</span>
        </button>

    </div>

</div>
{
//toFixed(1) in JavaScript rounds a number to 1 digit after the decimal point.
//If you remove the $ from ${vendor.count}, JavaScript will not insert the value of the variable. It will display the text literally.
   //``With backticks, you can insert variables using ${}.
                     }                     </div>


                   
                ))}

                 
            </div>
        </div></div>
    );
}

export default Eventsinfo;


















/*here when city is selected ,event is selected and service is selected then axios call made to the backend and 
from there it would match the city and sertvices with the vendors who have said yes for them
and would send all the data of that vendor to the frontend and frontend would store that using a usestae into vendor and that can ve shown in cards.
*/