import userModel from '../models/user.js'

class userController {
    static dashboard = (req,res)=> {
        res.render("dashboard")
    }

    static registration = (req,res)=> {
        res.render("registration")
    }

    static createUserDoc = async (req,res) => {
        try{
            // Creating New Document Using Model
            const doc =  new userModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            // Saving Document
            await doc.save()
            res.redirect('./login')

        }catch(error){

            console.log(error)
        }
    }

    static login = (req,res)=> {
        res.render("login")
    }

    static verifylogin = async (req,res)=> {
        try {
            
            const {email,password} = req.body
            const result = await userModel.findOne({email: email})


          if(result != null){

            if(result.email == email && result.password == password){
                
               res.redirect('./dashboard')

            } else {
                res.send(`<h3> Email or password is not valid! </h3>`)
            }

          } else {
              res.send(`<h3>You are not Registered!</h3>`) 
          }

        } catch (error) {
            console.log(error)
        }
    }
}

export default userController