
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./AadharRegister.css";

interface AadharData {
    emailid:string;
    contact:string;
    name: string;
    address: string;
    acardno: string;
    dob: string;
    gender: string;
    city: string;
}

function AadharRegister() {
    const [frontPic, setFrontPic] = useState<File | null>(null);
    const [backPic, setBackPic] = useState<File | null>(null);

    const [frontPreview, setFrontPreview] = useState("");
    const [backPreview, setBackPreview] = useState("");
const [loading, setLoading] = useState(false);
  

    const [obj, setObj] = useState<AadharData>({
        name: "",
        address: "",
        acardno: "",
        dob: "",
        gender: "",
        city: "",
         emailid:"",
    contact:""
    });



async function citizensUpdaterecord() {
    try {
        let url = "http://localhost:2010/citizenrouter/citizensupdate";

        let frmData = new FormData();

        frmData.append("emailid", obj.emailid);
     
     frmData.append("contact", obj.contact);
       if (frontPic) {
    frmData.append("frontPic", frontPic);
}
   frmData.append("name", obj.name);
        frmData.append("address", obj.address);
        frmData.append("acardno", obj.acardno);
        frmData.append("dob", obj.dob);
        frmData.append("gender", obj.gender);
        frmData.append("city", obj.city);
if (backPic) {
    frmData.append("backPic", backPic);
}

    let resp = await axios.post(url, frmData);

if (resp.data.status === true) {
    alert("Update completed");
} else {
    alert(resp.data.msg || "Update failed");
}}
    catch (err) {
        console.log(err);
        alert("Unable to update vendor");
    }
}


useEffect(()=>{
async function citizensFetch(
    
) {
   
     let url = "http://localhost:2010/citizenrouter/citizensfind";

    try {
        let resp = await axios.post(url, {
            emailid: obj.emailid},
        {   headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }});
       
if (resp.data.status) {
    setObj(prev => ({ ...prev, ...resp.data.msg }));
    
} else {
    alert(resp.data.msg);
}    }
    catch (err) {
        console.log(err);
       
    }
}
citizensFetch();},[])

       



  function doFrontPic(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
        setFrontPic(file);
        setFrontPreview(URL.createObjectURL(file));

        // Start extraction if the back photo is already selected
        if (backPic) {
            doExtract(file, backPic);
        }
    }
}

function doBackPic(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
        setBackPic(file);
        setBackPreview(URL.createObjectURL(file));

        // Start extraction if the front photo is already selected
        if (frontPic) {
            doExtract(frontPic, file);
        }
    }
}




   async function doExtract(frontFile: File, backFile: File) {
    const frmData = new FormData();

    frmData.append("frontPic", frontFile);
    frmData.append("backPic", backFile);

    setLoading(true);

    try {
        const url =
            "http://localhost:2010/citizenrouter/doExtractAadhaar";

        const resp = await axios.post(url, frmData);

        if (resp.data.status === true) {
            setObj(prev => ({
                ...prev,
                ...resp.data.msg
            }));
        } else {
            alert(resp.data.msg || "Unable to extract Aadhaar details.");
        }
    } catch (err: any) {
        console.log("Extraction error:", err);

        alert(
            err.response?.data?.message ||
            "Could not extract details. Check your backend connection."
        );
    } finally {
        setLoading(false);
    }
}



    function doUpdate(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setObj({
            ...obj,
            [name]: value
        });
    }



   
async function doSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const frmData = new FormData();

    if (frontPic) {
        frmData.append("frontPic", frontPic);
    }

    if (backPic) {
        frmData.append("backPic", backPic);
    }

    // Append the form fields only once
    frmData.append("name", obj.name);
    frmData.append("address", obj.address);
    frmData.append("acardno", obj.acardno);
    frmData.append("dob", obj.dob);
    frmData.append("gender", obj.gender);
    frmData.append("city", obj.city);
    frmData.append("contact", obj.contact);
    frmData.append("emailid", obj.emailid);

    try {
        const url =
            "http://localhost:2010/citizenrouter/Citizenregister";

        const resp = await axios.post(url, frmData);

        if (resp.data.status) {
            alert(JSON.stringify(resp.data.message));
        } else {
            alert(resp.data.message || "Registration failed.");
        }
    } catch (err) {
        console.log(err);

        if (axios.isAxiosError(err)) {
            alert(
                err.response?.data?.message ||
                "Unable to submit the form."
            );
        } else {
            alert("Unable to submit the form.");
        }
    }
}


    return (
        <div className="aadhar-page">
            <form className="aadhar-form" onSubmit={doSubmit}>
                <h1>Aadhaar Registration</h1>

                <h3>Upload Aadhaar Card</h3>

                <div className="upload-grid">
                    <div className="form-group">
                        <label>Aadhaar Front Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={doFrontPic}
                        />

                        {frontPreview && (
                            <img
                                src={frontPreview}
                                alt="Aadhaar front preview"
                                className="preview"
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label>Aadhaar Back Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={doBackPic}
                        />

                        {backPreview && (
                            <img
                                src={backPreview}
                                alt="Aadhaar back preview"
                                className="preview"
                            />
                        )}
                    </div>
                </div>
 {loading && (
    <div className="loading-container">
        <div className="spinner"></div>
        <p>Extracting Aadhaar details... Please wait.</p>
    </div>
)}

                <h3>Aadhaar Details</h3>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            value={obj.name}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Aadhaar Number</label>
                        <input
                            name="acardno"
                            value={obj.acardno}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            name="dob"
                            value={obj.dob}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <input
                            name="gender"
                            value={obj.gender}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            name="city"
                            value={obj.city}
                            readOnly
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Address</label>
                        <input
                            name="address"
                            value={obj.address}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Number</label>
                        <input
                            type="tel"
                            name="contact"
                            value={obj.contact}
                            onChange={doUpdate
                            }
                            placeholder="Enter contact number"
                            required
                        />
                    </div>

                   <div className="form-group">
    <label>Email ID</label>

    <div style={{ display: "flex", gap: "5px" }}>
        <input
            type="email"
            name="emailid"
            value={obj.emailid}
            onChange={doUpdate}
            placeholder="Enter email ID"
            required
        />

    
    </div>
</div>
                </div>

                <button type="submit" className="submit-btn">
                    Submit Registration
                </button>
                <button
    type="button"
    className="submit-btn"
    onClick={citizensUpdaterecord}
>
    Update Details
</button>
            </form>
        </div>
    );
    
}

export default AadharRegister;
