import VendorRegister from "./Vendorregistration";
import AadharRegister from"./Citizens"
import Eventsinfo from "./searchvendor";
import Favorites from "./favvendorslist"
import Signup from "./signup";
import Login from "./login";
import NavBar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import VendorDashboard from "./vendor-dashboard";
import CitizenDashboard from "./citizen-dashboard";
import MainPage from "./mainfrontpage"; 
import Index from "./Index"
function App() {
    return  (<>
   { /*
    <VendorRegister />
   */
   /*
   <AadharRegister/>
   */
   /*
   <Eventsinfo/>
   */
  /*
  <Favorites/>
  */
 /*
 <Signup/>
  */
 /*
  <Login/>
  */
  }

 <Routes>
      <Route path="/" element={<MainPage/>}>

 <Route index element={<Index />} />
 {/*index element is udsed to somethimng by default */}
  <Route path="/signup" element={<Signup></Signup>}></Route>
      
       <Route path="/login" element={<Login></Login>}></Route>
            </Route>
     
 <Route path="/vendor-dashboard" element={<VendorDashboard />}>

        <Route
            path="registration"
            element={<VendorRegister />}
        />

    </Route>


<Route path="/citizen-dashboard" element={<CitizenDashboard />}>
<Route index element={<Favorites />} />
    <Route path="favorites" element={<Favorites />} />

    <Route path="search" element={<Eventsinfo />} />

    <Route path="details" element={<AadharRegister />} />

{//we dont have / in path bcz  React Router automatically understands child routes relative to their parent route.
}</Route>


    </Routes>

</>)
}

export default App;
