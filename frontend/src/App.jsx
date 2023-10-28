import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
 import Registervoter from "./voters/voterreg";
  import Passkeylogin from "./voters/passkeylogin";
 import Castavote from "./votes/ballot";
 import Result from "./results/results";
import Thankyou from "./thankyou";
function App(){
return(
<BrowserRouter>
<Routes>
<Route path="/register/new/voter" element={<Registervoter/>}/>
<Route path="/" element={<Passkeylogin/>}/>
<Route path="/cast/vote" element={<Castavote/>}/>
<Route path="/view/results" element={<Result/>}/>
<Route path="/thankyou" element={<Thankyou/>}/>
</Routes>






</BrowserRouter>
)





}

export default App