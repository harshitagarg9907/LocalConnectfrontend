
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./VendorRegister.css";
import axios from "axios";

interface VendorRegisterState {
    emailid: string;
    name: string;
    contact: string;
    business: string;
    area: string;
    address: string;
    city: string;
    estd: string;
    website: string;
    insta: string;
    selcate: string[];
   shoppicurl: string ;
certpicurl: string ;
totalSum: number;
count: number;
}

function VendorRegister() {

    const [obj, setObj] = useState<VendorRegisterState>({
        emailid: "",
        name: "",
        contact: "",
        business: "",
        area: "",
        address: "",
        city: "",
        estd: "",
        website: "",
        insta: "",
        selcate: [],
        shoppicurl: "",
        certpicurl: "",
     totalSum: 0,
count: 0
    });

    const [category, setCategory] = useState<string>("");

    const [shopPreview, setShopPreview] = useState<string>("");
    const [certificatePreview, setCertificatePreview] =
        useState<string>("");

    const categoryOptions: string[] = [
       "Photographer",
            "Decoration",
            "Catering",
            "Cake",
            "DJ",
            "Venue",  "Makeup Artist",
            "Florist",
               "Lighting"
             
            
    ];

function doUpdate(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setObj({
        ...obj,
        [name]: value
    });
}

async function doUpdaterecord() {
    try {
        let url = "http://localhost:2010/vendorrouter/vendorupdate";

        let frmData = new FormData();

        frmData.append("emailid", obj.emailid);
        frmData.append("name", obj.name);
        frmData.append("contact", obj.contact);
        frmData.append("business", obj.business);
        frmData.append("area", obj.area);
        frmData.append("address", obj.address);
        frmData.append("city", obj.city);
        frmData.append("estd", obj.estd);
        frmData.append("website", obj.website);
        frmData.append("insta", obj.insta);
        frmData.append("categories", JSON.stringify(obj.selcate));
       frmData.append("shoppicurl", obj.shoppicurl);  
            frmData.append("certpicurl", obj.certpicurl);
        

        let resp = await axios.post(url, frmData);
if (resp.data.status === true) {
        alert( "Update completed");
    }}
    catch (err) {
        console.log(err);
        alert("Unable to update vendor");
    }
}

useEffect
(()=>{async function doFetch() {// when the page is loaded the obj.emailid is empty so no emailid is sent grom here just token validation done and from the backend from jwt validation the emailid will be sent to vendorfind
    try {
        let url = "http://localhost:2010/vendorrouter/vendorfind";
console.log(obj.emailid);
        let resp = await axios.post(url, {emailid:obj.emailid}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (resp.data.status) {
            setObj(resp.data.msg);
             setShopPreview(resp.data.msg.shoppicurl);
    setCertificatePreview(resp.data.msg.certpicurl);
}
    }
    catch (err) {
        console.log(err);
    }
}
doFetch();},[]
)



    function removeCategory(item: string) {
        setObj({
            ...obj,
            selcate: obj.selcate.filter(
                (cat) => cat !== item
            )
        });
    }

    function doShopPic(event: ChangeEvent<HTMLInputElement>) {
        let file = event.target.files?.[0];

        if (file) {
            setObj({
                ...obj,
                shoppicurl: file
            });

            setShopPreview(URL.createObjectURL(file));
        }
    }

    function doCertificatePic(
        event: ChangeEvent<HTMLInputElement>
    ) {
        let file = event.target.files?.[0];

        if (file) {
            setObj({
                ...obj,
                certpicurl: file
            });

            setCertificatePreview(URL.createObjectURL(file));
        }
    }

   async function doRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

  let url="http://localhost:2010/vendorrouter/vendorsignup";

        let frmData = new FormData();

        frmData.append("emailid", obj.emailid);
        frmData.append("name", obj.name);
        frmData.append("contact", obj.contact);
        frmData.append("business", obj.business);
        frmData.append("area", obj.area);
        frmData.append("address", obj.address);
        frmData.append("city", obj.city);
        frmData.append("estd", obj.estd);
        frmData.append("website", obj.website);
        frmData.append("insta", obj.insta);
        frmData.append("selcate", obj.selcate);
        frmData.append(
            "categories",
            JSON.stringify(obj.selcate)
        );

        if (obj.shoppicurl) {
            frmData.append("shopPic", obj.shoppicurl);
        }

        if (obj.certpicurl) {
            frmData.append(
                "certificatePic",
                obj.certpicurl
            );
        }
       
await axios.post(url,frmData,{headers: {'Content-Type': 'multipart/form-data'  } }
);
        // Send frmData to your backend registration API.
        console.log("Form data prepared:", obj);
        alert("Form data is ready to be submitted.");
       
    }




    return (
        <div className="vendor-page">
            <form className="vendor-form" onSubmit={doRegister}>


                <h1>Vendor Registration</h1>
<div className="vendor-rating">

    <h3>My Business Rating</h3>

    {obj.count > 0 ? (
        <>
            <h2>
                ⭐ {(obj.totalSum / obj.count).toFixed(1)} / 5
            </h2>

            <p>
                Based on {obj.count} customer ratings
            </p>
        </>
    ) : (
        <p>No ratings received yet.</p>
    )}

</div>
<br />
                {/* Personal Details */}

                <div className="form-grid">

                    <div className="form-group">
                        <label>Email ID</label>

                        <div className="fetch-row">
                            <input
                                type="email"
                                name="emailid"
                                value={obj.emailid}
                                onChange={doUpdate}
                                placeholder="Enter email ID"
                                required
                            />

                           {/* <button
                                type="button"
                                onClick={doFetch}
                                className="fetch-btn"
                            >
                                Fetch
                            </button>
*/}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={obj.name}
                            onChange={doUpdate}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Number</label>
                        <input
                            type="tel"
                            name="contact"
                            value={obj.contact}
                            onChange={doUpdate}
                            placeholder="Enter contact number"
                            required
                        />
                    </div>

                </div>

                {/* Business Details */}

                <h2 className="section-heading">
                    Business Details
                </h2>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Business Name</label>
                        <input
                            type="text"
                            name="business"
                            value={obj.business}
                            onChange={doUpdate}
                            placeholder="Enter business name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Area</label>
                        <input
                            type="text"
                            name="area"
                            value={obj.area}
                            onChange={doUpdate}
                            placeholder="Enter area"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={obj.address}
                            onChange={doUpdate}
                            placeholder="Enter full address"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={obj.city}
                            onChange={doUpdate}
                            placeholder="Enter city"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Established In</label>
                        <input
                            type="number"
                            name="estd"
                            value={obj.estd}
                            onChange={doUpdate}
                            placeholder="e.g. 2015"
                            min="1800"
                            max={new Date().getFullYear()}
                        />
                    </div>

                </div>

                {/* Business Categories */}

                <h3 className="sub-heading">
                    Select Business Category
                </h3>

               <div className="category-row">
    <select
        value={category}
        onChange={(event) => {
            const selectedCategory = event.target.value;

            if (selectedCategory === "") {
                return;
            }

            if (obj.selcate.includes(selectedCategory)) {
                alert("Category already selected");
                setCategory("");
                return;
            }

            setObj({
                ...obj,
                selcate: [...obj.selcate, selectedCategory]
            });

            setCategory("");
        }}
    >
        <option value="">
            Select a category
        </option>

        {categoryOptions.map((item) => (
            <option key={item} value={item}>
                {item}
            </option>
        ))}
    </select>

                </div>

                <h3 className="sub-heading">
                    Selected Categories
                </h3>

                <div className="selected-categories">

                    {obj.selcate.length === 0 ? (
                        <p className="empty-text">
                            No categories selected yet
                        </p>
                    ) : (
                        obj.selcate.map((item) => (
                            <div
                                className="category-chip"
                                key={item}
                            >
                                {item}

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeCategory(item)
                                    }
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}

                </div>

                {/* Online Presence */}

                <h2 className="section-heading">
                    Online Presence
                </h2>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Website URL</label>
                        <input
                            type="url"
                            name="website"
                            value={obj.website}
                            onChange={doUpdate}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Instagram ID</label>
                        <input
                            type="text"
                            name="insta"
                            value={obj.insta}
                            onChange={doUpdate}
                            placeholder="@yourbusiness"
                        />
                    </div>

                </div>

                {/* Shop Picture */}

                <h2 className="section-heading">
                    Shop Picture
                </h2>

                <div className="upload-section">

                    <label htmlFor="shopPic">
                        Upload Shop Picture
                    </label>

                    <input
                        type="file"
                        id="shopPic"
                        accept="image/*"
                        onChange={doShopPic}
                    />

                    {shopPreview && (
                        <div className="preview-box">
                            <p>Shop Picture Preview</p>

                            <img
                                src={shopPreview}
                                alt="Shop preview"
                            />
                        </div>
                    )}

                </div>

                {/* Business Certificate */}

                <h2 className="section-heading">
                    Business Certificate
                </h2>

                <div className="upload-section">

                    <label htmlFor="certificatePic">
                        Upload Business Certificate
                    </label>

                    <input
                        type="file"
                        id="certificatePic"
                        accept="image/*"
                        onChange={doCertificatePic}
                    />

                    {certificatePreview && (
                        <div className="preview-box">
                            <p>Certificate Preview</p>

                            <img
                                src={certificatePreview}
                                alt="Certificate preview"
                            />
                        </div>
                    )}

                </div>

                <button
                    type="submit"
                    className="register-btn"
                >
                    Register Vendor
                </button>

<button type="button"      className="register-btn" onClick={doUpdaterecord}>
    Update
</button>


            </form>
        </div>
    );
}

export default VendorRegister;

