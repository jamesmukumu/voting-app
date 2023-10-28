const Votes = require('../../schemas/votes/votesmodel')
const Sequelize = require('sequelize')
//post a vote


async function postVoteAzimio(req,res){
try {

const castedVote = new Votes({
    politicalParty:"Azimio la umoja",
    vote:req.body.vote
})
await castedVote.save()
return res.status(200).json({message:"Vote casted"})
} catch (error) {
 if(error.name=="SequelizeValidationError"){
return res.status(500).json({error:"Vote must be a yes or no"})
 }
 else{
    return res.status(500).json({error})
 }   
}
}


//vote uda

async function postVoteuda(req,res){
    try {
    
    const castedVote = new Votes({
        politicalParty:"uda",
        vote:req.body.vote
    })
    await castedVote.save()
    return res.status(200).json({message:"Vote casted"})
    } catch (error) {
     if(error.name=="SequelizeValidationError"){
    return res.status(500).json({error:"Vote must be a yes or no"})
     }
     else{
        return res.status(500).json({error})
     }   
    }
    }


    async function postVoteroots(req,res){
        try {
        
        const castedVote = new Votes({
            politicalParty:"roots party",
            vote:req.body.vote
        })
        await castedVote.save()
        return res.status(200).json({message:"Vote casted"})
        } catch (error) {
         if(error.name=="SequelizeValidationError"){
        return res.status(500).json({error:"Vote must be a yes or no"})
         }
         else{
            return res.status(500).json({error})
         }   
        }
        }






        async function postVoteagano(req,res){
            try {
            
            const castedVote = new Votes({
                politicalParty:"agano",
                vote:req.body.vote
            })
            await castedVote.save()
            return res.status(200).json({message:"Vote casted"})
            } catch (error) {
             if(error.name=="SequelizeValidationError"){
            return res.status(500).json({error:"Vote must be a yes or no"})
             }
             else{
                return res.status(500).json({error})
             }   
            }
            }
























//count votes UDA
async function countVotesUda(req,res){
try {
const countedVotes = await Votes.count({where:{politicalParty:{[Sequelize.Op.iLike]:"%uda%"}}})
if(countedVotes===0){
return res.status(200).json(0)
}
else{
    return res.status(200).json({message:'votes are',data:countedVotes})
}  
} catch (error) {
 return res.status(500).json({error})   
}
}


//count votes azimio
async function countazimio(req,res){
    try {
    const countedVotes = await Votes.count({where:{politicalParty:{[Sequelize.Op.iLike]:"%azimio%"}}})
    if(countedVotes===0){
    return res.status(200).json({message:"null votes",data:0})
    }
    else{
        return res.status(200).json({message:'votes counted',data:countedVotes})
    }  
    } catch (error) {
     return res.status(500).json({error})   
    }
    }
    


//count votes agano
async function countVotesagano(req,res){
    try {
    const countedVotes = await Votes.count({where:{politicalParty:{[Sequelize.Op.iLike]:"%agano%"}}})
    if(countedVotes===0){
    return res.status(200).json(0)
    }
    else{
        return res.status(200).json({message:'votes are',data:countedVotes})
    }  
    } catch (error) {
     return res.status(500).json({error})   
    }
    }
    


    async function countVotesroots(req,res){
        try {
        const countedVotes = await Votes.count({where:{politicalParty:{[Sequelize.Op.iLike]:"%roots%"}}})
        if(countedVotes===0){
        return res.status(200).json(0)
        }
        else{
            return res.status(200).json({message:'votes are',data:countedVotes})
        }  
        } catch (error) {
         return res.status(500).json({error})   
        }
        }
        









//count total votes casted
 async function countAllvotes(req,res){
try {
   const totalVotes = await Votes.count({
  
})
if(totalVotes===0){
return res.status(200).json({message:'null votes',data:0})
}
else{
return res.status(200).json({message:"all votes",data:totalVotes})
}
    
} catch (error) {
return res.status(200).json({error})    
}


 }







module.exports = {postVoteAzimio,postVoteagano,postVoteroots,postVoteuda,countVotesUda,countVotesagano,countazimio,countVotesroots,countAllvotes}