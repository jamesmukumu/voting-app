import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie"
import Preloader from "../preloader";
import { useNavigate } from "react-router-dom";


function Result(){
  let navigate = useNavigate()
const [totalResults,setTotalresults] = useState([])
const [azimioResults,setAzimioresults] = useState([])
const [rootsResults,setRootsresults] = useState([])
const [aganoResults,setAganoresults] = useState([])
const [udaResults,setUdaresults] = useState([])
const token = Cookie.get("access cookie")
const [azimioData,setAzimiodata] = useState([])
 const  [udaData,setUdadata] = useState([])

 const  [rootsData,setRootsdata] = useState([])
const [aganoData,setAganodata] = useState([])
const [loading,setLoading] = useState(false)

//get total results 
useEffect(()=>{
    async function getTotalresults(){
      
        try {
        const response = await axios.get("http://localhost:5544/all/votes",{
            headers:{Authorization:token}
        })
        if(response.data.message==="all votes"){
        setTotalresults(response.data.data)
      
        }    
        else if(response.data.message==="null votes"){
        setTotalresults(response.data.data)
       
        }
        else if(response.data.message==="Forbidden"){
        navigate('/')
        }
        } catch (error) {
           setTotalresults([])
           console.log(error) 
        }
        }
        
        getTotalresults()
},[])
















//get azimio votes

useEffect(()=>{
    async function getAzimioresults(){
      setLoading(true)
        try {
        const response = await axios.get("http://localhost:5544/count/votes/azimio",{
            headers:{Authorization:token}
        })
        if(response.data.message==="votes counted"){
        setAzimioresults(response.data.data)
        setLoading(false)
        }    
        else if(response.data.message==="null votes"){
        setAzimioresults(response.data.data)
        setLoading(false)
        }
        else if(response.data.message==="Forbidden"){
          
          setTimeout(()=>{
            navigate('/')
          },3000)
          }
        } catch (error) {
           setAzimioresults([])
           console.log(error) 
        }
        }
        
        getAzimioresults()
},[])


//get uda results
useEffect(()=>{
    async function getUdaresults(){
        try {
        const response = await axios.get("http://localhost:5544/count/votes/uda",{
            headers:{Authorization:token}
        })
        if(response.data.message==="votes are"){
        setUdaresults(response.data.data)
        }    
        else if(response.data.message==="null votes"){
        setUdaresults(response.data.data)
        }
        } catch (error) {
           setUdaresults([])
           console.log(error) 
        }
        }
        
        getUdaresults()
},[])



//roots party results
useEffect(()=>{
    async function getRootsparty(){
        try {
        const response = await axios.get("http://localhost:5544/count/votes/roots",{
            headers:{Authorization:token}
        })
        if(response.data.message==="votes are"){
        setRootsresults(response.data.data)
        }    
        else if(response.data.message==="null votes"){
        setRootsresults(response.data.data)
        }
        } catch (error) {
           setRootsresults([])
           console.log(error) 
        }
        }
        
        getRootsparty()
},[])




//agano party

useEffect(()=>{
    async function getAganovotes(){
        try {
        const response = await axios.get("http://localhost:5544/count/votes/agano",{
            headers:{Authorization:token}
        })
        if(response.data.message==="votes are"){
        setAganoresults(response.data.data)
        }    
        else if(response.data.message==="null votes"){
        setAganoresults(response.data.data)
        }
        } catch (error) {
           setAganoresults([])
           console.log(error) 
        }
        }
        
        getAganovotes()
},[])


































useEffect(()=>{
    async function fetchAzimiocandidate(){
    try {
    const response = await axios.get('http://localhost:5544/get/azimio',
    {headers:{Authorization:token}})
    
    if(response.data.message==='Candidate not found'){
    setAzimiodata([])
    }
    else if(response.data.message==='Candidate found'){
    setAzimiodata(response.data.data)
    }
    } catch (error) {
       console.log(error) 
    }
    }
    
    fetchAzimiocandidate()
    
    
    },[token])
    
    
    
    //fetch uda
    useEffect(()=>{
        async function fetchUdacandidate(){
        try {
        const response = await axios.get('http://localhost:5544/get/uda',
        {headers:{Authorization:token}})
        
        if(response.data.message==='Candidate not found'){
        setUdadata([])
        }
        else if(response.data.message==='Candidate found'){
        setUdadata(response.data.data)
        }
        } catch (error) {
           console.log(error) 
        }
        }
        
       fetchUdacandidate()
        
        
        },[token])
    
    
    
    
    //fetch roots data
    useEffect(()=>{
        async function fetchRootsdata(){
        try {
        const response = await axios.get('http://localhost:5544/get/roots',
        {headers:{Authorization:token}})
        
        if(response.data.message==='Candidate not found'){
        setRootsdata([])
        }
        else if(response.data.message==='Candidate found'){
        setRootsdata(response.data.data)
        }
        } catch (error) {
           console.log(error) 
        }
        }
        
      fetchRootsdata()
        
        
        },[token])
    
    
    
    //fetch agano data
    useEffect(()=>{
        async function fetchAganodata(){
        try {
        const response = await axios.get('http://localhost:5544/get/agano',
        {headers:{Authorization:token}})
        
        if(response.data.message==='Candidate not found'){
        setAganodata([])
        }
        else if(response.data.message==='Candidate found'){
        setAganodata(response.data.data)
        }
        } catch (error) {
           console.log(error) 
        }
        }
        
    fetchAganodata()
        
        
        },[token])
    


    
    const azimioPercentage = (azimioResults / totalResults )* 100
    const roundedAzimio = azimioPercentage.toFixed(3)


    const udaPercentage = (udaResults/ totalResults )* 100
    const roundedUda = udaPercentage.toFixed(3)


    const rootsPercentage = (rootsResults/ totalResults )* 100
    const roundedroots = rootsPercentage.toFixed(3)
  

    const aganoPercentage = (aganoResults/ totalResults )* 100
    const roundedagano = aganoPercentage.toFixed(3)


return(
<div className="table-container">

<div className="rules">
<p style={{fontFamily:"'Gabarito',sans-serif"}}>&copy;James Mukumu 2023</p>
<div>
<strong>RESULTS PAPER</strong>
</div>

<img src="data:image/png;base64,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" alt="" />


<div>
<p className="votes"> Total No of votes casted :  {totalResults}</p>
</div>

{loading?(<Preloader/>):(
  







  <table className="custom-table">
  <thead>
            <tr>
              <th>Political Party</th>
              <th>Presidential Candidate</th>
              <th>Running Mate</th>
              <th>Votes Received</th>
              <th>Votes as percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
               <p>{azimioData.politicalPartyname}</p>
               <img src={azimioData.politicalpartylogo} alt="" />
              </td>
              <td>
              <p>{azimioData.firstNamemain} 
               </p>
              <p>{azimioData.secondNamemain}a</p>
              <img src={azimioData.imageMain} alt="" />
              </td>
              <td>
            <p>{azimioData.runningMatefirstname}</p>
             <p>
             {azimioData.runningMatesecondname}
             </p>
               
                <img src={azimioData.imagerunningMate} alt="" />
  
              </td>
              <td>
              <strong>{azimioResults}</strong>
              </td>
              <td>
                 {roundedAzimio}% 
              </td>
            </tr>
            <tr>
              <td>
              <p>{udaData.politicalPartyname}</p>
               <img src={udaData.politicalpartylogo} alt="" />
  
              </td>
              <td>
              <p>{udaData.firstNamemain} 
               </p>
              <p>{udaData.secondNamemain}</p>
              <img src={udaData.imageMain} alt="" />
              </td>
              <td>
              <p>{udaData.runningMatefirstname}</p>
             <p>
             {udaData.runningMatesecondname}
             </p>
               
                <img src={udaData.imagerunningMate} alt="" />
  
  
              </td>
              <td>
              <strong>{udaResults}</strong>
              </td>
              <td>
                {roundedUda}% 
              </td>
            </tr>
            <tr>
              <td>
              <p>{rootsData.politicalPartyname}</p>
               <img src={rootsData.politicalpartylogo} alt="" />
  
              </td>
              <td>
              <p>{rootsData.firstNamemain} 
               </p>
              <p>{rootsData.secondNamemain}</p>
              <img src={rootsData.imageMain} alt="" />
  
              </td>
              <td>
  
              <p>{rootsData.runningMatefirstname}</p>
             <p>
             {rootsData.runningMatesecondname}
             </p>
               
                <img src={rootsData.imagerunningMate} alt="" />
  
              </td>
              
              <td> 
               {rootsResults}
  
                  </td>
                  <td>
                  {roundedroots}%
                  </td>
  
            </tr>
            <tr>
              <td>
  
              <p>{aganoData.politicalPartyname}</p>
               <img src={aganoData.politicalpartylogo} alt="" />
  
              </td>
              <td>
              <p>{aganoData.firstNamemain} 
               </p>
              <p>{aganoData.secondNamemain}</p>
              <img src={aganoData.imageMain} alt="" />
  
  
  
              </td>
              <td>
  
              <p>{aganoData.runningMatefirstname}</p>
             <p>
             {aganoData.runningMatesecondname}
             </p>
               
                <img src={aganoData.imagerunningMate} alt="" />
  
  
              </td>
              <td>
  
               <strong>{aganoResults}</strong>
              </td>
              <td>
                  {roundedagano}%
              </td>
            </tr>
          </tbody>
        </table>
  
  
  
)}









</div>













</div>

)



}

export default Result