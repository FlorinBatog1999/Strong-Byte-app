const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const Sequelize=require('sequelize')
const cors=require('cors')
require('dotenv').config()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
const sequelize=new Sequelize(process.env.DATABASE,process.env.USER,'',{
    host:process.env.HOST,
    dialect:"mysql",
    define:{
        timestamps:false
    }
})

const Produs=require('./produs')(sequelize,Sequelize)
const Utilizator=require('./utilizator')(sequelize,Sequelize);

Utilizator.hasMany(Produs);
app.get('/create',async (req,res,next)=>{
    try{
        await sequelize.sync({force:true});
        res.status(201).json({message:"created"});}
    catch(err){
        console.warn(err);
        res.status(404).json({message:"error"})
    }
});
    
//Creare cont
app.post('/register',async (req,res,next)=>{
    try{
        
        Utilizator.create(req.body)
        res.status(201).json({message:`${req.body.nume}, ai fost inregistrat`})
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
//Gestionare lista personala

app.get('/myaccount/:iduser/mylist',async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne({where:{iduser:req.params.iduser},include:[Produs]})
        if(user){
                let produs=await Produs.findAll({where:{
                    nume_proprietar:user.nume,
                    prenume_proprietar:user.prenume
                }});
                res.status(201).json(produs)            
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)
    }
})
app.post('/myaccount/:bid/mylist', async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne({where:{iduser:req.params.bid}})
        if(user){
            const produs=new Produs(req.body)
            produs.nume_proprietar=user.nume
            produs.prenume_proprietar=user.prenume
            await produs.save()
            res.status(201).json(produs)            
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)
    }
})
app.delete('/myaccount/:id/mylist', async (req,res,next)=>{
    try{
        const user=await Utilizator.findByPk(req.body.iduser)
        if(user){
            const produs=await Produs.findAll()
            await produs.destroy()
            res.status(201).json({message:"all products were deleted"})            
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)
    }
})
app.get('/myaccount/:id',async (req,res,next)=>{
    try{
        let user=await Utilizator.findOne(req.body.iduser)
        if(user){
            res.status(201).json(user)
        }
        else{
            res.status(404).json({message:"not found"})
        }
        
    }catch(err){
        next(err)
    }
})

app.get('/myaccount/:iduser/mylist/:pid',async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne({where:{iduser:req.params.iduser}})
        if(user){
            const produs=await Produs.findByPk(req.params.pid,{id:req.params.pid})
            if(produs){
                res.status(201).json(produs)
            }else{
                res.status(404).json({message:"product passed the expired data or it was deleted"})
            }
             
        }
        else{
            res.status(404).json({message:"not found"})
        }
       
    }catch(err){
        next(err)
    }
})

app.put('/myaccount/:id/mylist/:pid',async (req,res,next)=>{
    try{
        const user= await Utilizator.findOne({where:{iduser:req.params.id}})
        if(user){
            const produs=await Produs.findByPk(req.params.pid)
            produs.nume=req.body.nume;
            produs.nume_proprietar=req.body.nume_proprietar
            produs.prenume_proprietar=req.body.prenume_proprietar
            produs.data_expirare=req.body.data_expirare
            await produs.save()
            res.status(201).json(produs)
        }
    }catch(err){
        next(err)
    }
})
app.delete('/myaccount/:id/mylist/:pid',async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne({where:{iduser:req.params.id}})
        if(user){
                const produs=await Produs.findByPk(req.params.pid)
                if(produs){
                    await produs.destroy()
                    res.status(201).json({message:"product was deleted"})
                }else{
                    res.status(404).json({message:"product not found"})
                }            
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)
    }
})



///////////////////////////
//VegetarianGroup
app.get('/vegetariangroup',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator:"vegetarian"
            }
        })
        res.status(201).json(member)
    }catch(err){
        next(err)
    }
})
app.get('/vegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const member=await Utilizator.findOne({
            where:{
                tip_utilizator: "vegetarian",
                iduser: req.params.iduser
            },
        })
        if(member){
            res.status(201).json(member)
        }
        else{
            res.status(404).json({message:`Nu l-am gasit pe ${req.params.iduser}`})
        }
    }catch(err){
        next(err)
    }
})
app.post('/vegetariangroup', async (req,res,next)=>{
    try{
        const user=await Utilizator.create(req.body)
        res.status(201).json(user);             
    }catch(err){
        next(err)
    }
})
app.put('/vegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user= await Utilizator.findOne({where:{iduser:req.body.iduser}})
        if(user){
            user.iduser=req.body.iduser;
            user.nume=req.body.nume;
            user.prenume=req.body.prenume;
            user.email=req.body.email;
            user.data_logare=req.body.data_logare;
            user.tip_utilizator=req.body.tip_utilizator;
            await user.save();
            res.status(201).json(user)
        }
    }catch(err){
        next(err)
    }
})
app.delete('/vegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne({where:{iduser:req.params.iduser}})
        if(user){
            await user.destroy();
            res.status(201).json({message:"completed"})
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)
    }
})
/////////////////////////////////////
//CarnivorousGroup
app.get('/carnivorousgroup',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator:"carnivor"
            },
        })
        if(member){
                res.status(201).json(member)
            }
        else{
            res.status(201).json({message:"the list is empty"})
        }
        
    }catch(err){
        next(err)
    }
})
app.get('/carnivorousgroup/:iduser',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator: "carnivor",
                iduser: req.params.iduser
            }
        })
        if(member){
            res.status(201).json(member)
        }
        else{
            res.status(404).json({message:`Nu l-am gast pe ${req.params.iduser}`})
        }
    }catch(err){
        next(err)
    }
})
app.post('/carnivorousgroup', async (req,res,next)=>{
    try{
        const user=await Utilizator.create(req.body)
        res.status(201).json(user);             
    }catch(err){
        next(err)
    }
})
app.put('/carnivorousgroup/:iduser',async (req,res,next)=>{
    try{
        const user= await Utilizator.findByPk(req.params.iduser)
        if(user){
            user.iduser=req.body.iduser;
            user.nume=req.body.nume;
            user.prenume=req.body.prenume;
            user.email=req.body.email;
            user.data_logare=req.body.data_logare;
            user.tip_utilizator=req.body.tip_utilizator;
            await user.save();
            res.status(201).json(user)
        }
    }catch(err){
        next(err)
    }
})
app.delete('/carnivorousgroup/:iduser',async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne({where:{iduser:req.params.iduser}})
        if(user){
            await user.destroy();
            res.status(201).json({message:"completed"})
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
/////////////////////////////////////
//LactovegetarianGroup
app.get('/lactovegetariangroup',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator:"lactovegetarian"
            }
        })
        res.status(201).json(member)
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.get('/lactovegetariangroup/:nume',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator: "lactovegetarian",
                iduser: req.params.iduser
            }
        })
        if(member){
            res.status(201).json(member)
        }
        else{
            res.status(404).json({message:`Nu l-am gasit pe ${req.params.iduser}`})
        }
  
    }catch(err){
        next(err)
    }
})
app.post('/lactovegetariangroup', async (req,res,next)=>{
    try{
        const user=await Utilizator.create(req.body)
        res.status(201).json(user);             
    }catch(err){
        next(err)
    }
})
app.put('/lactovegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user= await Utilizator.findOne(req.params.iduser)
        if(user){
            user.iduser=req.body.iduser;
            user.nume=req.body.nume;
            user.prenume=req.body.prenume;
            user.email=req.body.email;
            user.data_logare=req.body.data_logare;
            user.tip_utilizator=req.body.tip_utilizator;
            await user.save();
            res.status(201).json(user)
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.delete('/lactovegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user=await Utilizator.findByPk(req.params.iduser)
        if(user){
            await user.destroy();
            res.status(201).json({message:"completed"})
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
//////////////////////////////////////
//LactoovovegetarianGroup
app.get('/lactoovovegetariangroup',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator:"lactoovovegetarian"
            },
        })
        if(member){
                res.status(201).json(member)
            }
        else{
            res.status(201).json({message:"the list is empty"})
        }
        
    }catch(err){
        next(err)
    }
})
app.get('/lactoovovegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator: "lactoovovegetarian",
                iduser: req.params.iduser
            }
        })
        if(member){
            res.status(201).json(member)
        }
        else{
            res.status(404).json({message:`Nu l-am gasit pe ${req.params.iduser}`})
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.post('/lactoovovegetariangroup', async (req,res,next)=>{
    try{
        const user=await Utilizator.create(req.body)
        res.status(201).json(user);             
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.put('/lactoovovegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user= await Utilizator.findOne(req.params.iduser)
        if(user){
            user.iduser=req.body.iduser;
            user.nume=req.body.nume;
            user.prenume=req.body.prenume;
            user.email=req.body.email;
            user.data_logare=req.body.data_logare;
            user.tip_utilizator=req.body.tip_utilizator;
            await user.save();
            res.status(201).json(user)
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.delete('/lactoovovegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne({where:{iduser:req.params.iduser}})
        if(user){
            await user.destroy();
            res.status(201).json({message:"completed"})
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
//////////////////////////////////////
//ApivegetarianGroup
app.get('/apivegetariangroup',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator:"apivegetarian"
            },
        })
        if(member){
                res.status(201).json(member)
            }
        else{
            res.status(201).json({message:"the list is empty"})
        }
        
    }catch(err){
        next(err)
    }
})
app.get('/apivegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const member=await Utilizator.findAll({
            where:{
                tip_utilizator: "apivegetarian",
                iduser: req.params.iduser
            },
        })
        if(member){
            res.status(201).json(member);
        }
        else{
            res.status(404).json({message:`Nu l-am gasit pe ${req.params.iduser}`});
        }
        
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.post('/apivegetariangroup', async (req,res,next)=>{
    try{
        const user=await Utilizator.create(req.body)
        res.status(201).json(user);             
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.put('/apivegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user= await Utilizator.findOne(req.params.iduser)
        if(user){
            user.iduser=req.body.iduser;
            user.nume=req.body.nume;
            user.prenume=req.body.prenume;
            user.email=req.body.email;
            user.data_logare=req.body.data_logare;
            user.tip_utilizator=req.body.tip_utilizator;
            await user.save();
            res.status(201).json(user)
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.delete('/apivegetariangroup/:iduser',async (req,res,next)=>{
    try{
        const user=await Utilizator.findOne(req.params.iduser)
        if(user){
            await user.destroy();
            res.status(201).json({message:"completed"})
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }catch(err){
        next(err)//pasez catre app.use care va trata eroarea
    }
})
app.use((err,req,res,next)=>{
    console.warn(err);
    res.status(505).json({message:"eroare"})
})
app.listen(5000)