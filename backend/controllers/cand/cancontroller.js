const Candidate = require('../../schemas/candidates/candidates')
const Sequelize = require("sequelize")

//post a candidate

async function postCandidate(req,res){
try {
const candidate = new Candidate({
firstNamemain:req.body.firstNamemain,
secondNamemain:req.body.secondNamemain,
imageMain:req.body.imageMain,
politicalPartyname:req.body.politicalPartyname,
politicalpartylogo:req.body.politicalpartylogo,
runningMatefirstname:req.body.runningMatefirstname,
runningMatesecondname:req.body.runningMatesecondname,
imagerunningMate:req.body.imagerunningMate
})
await candidate.save()
return res.status(200).json(candidate)
 
} catch (error) {
   return res.status(500).json({error}) 
}

}



//fetch azimio candidate


async function fetchAzimio(req,res){
try {
const azimioCandidate = await Candidate.findOne({where:{politicalPartyname:{[Sequelize.Op.iLike]:'%azimio la umoja%'}}})
if(!azimioCandidate){
return res.status(200).json({message:"Candidate not found"})
}
else{
   return res.status(200).json({message:"Candidate found",data:azimioCandidate})
}     
} catch (error) {

 
   return res.status(500).json({error})
 
}

}


// fetch uda

async function fetchUDA(req,res){
   try {
   const udaCandidate = await Candidate.findOne({where:{politicalPartyname:{[Sequelize.Op.iLike]:'%uda%'}}})
   if(!udaCandidate){
   return res.status(200).json({message:"Candidate not found"})
   }
   else{
      return res.status(200).json({message:"Candidate found",data:udaCandidate})
   }   
   } catch (error) {
    return res.status(500).json({error})  
   }
   
}
   //roots
   async function fetchRoots(req,res){
      try {
      const rootsCandidate = await Candidate.findOne({where:{politicalPartyname:{[Sequelize.Op.iLike]:'%roots%'}}})
      if(!rootsCandidate){
      return res.status(200).json({message:"Candidate not found"})
      }
      else{
         return res.status(200).json({message:"Candidate found",data:rootsCandidate})
      }   
      } catch (error) {
       return res.status(500).json({error:`${error}`})  
      }
      
   }
   
   //agano
   async function fetchAgano(req,res){
      try {
      const aganoCandidate = await Candidate.findOne({where:{politicalPartyname:{[Sequelize.Op.iLike]:'%agano%'}}})
      if(!aganoCandidate){
      return res.status(200).json({message:"Candidate not found"})
      }
      else{
         return res.status(200).json({message:"Candidate found",data:aganoCandidate})
      }   
      } catch (error) {
       return res.status(500).json({error})  
      }
      
   }








module.exports = {postCandidate,fetchAzimio,fetchUDA,fetchRoots,fetchAgano}