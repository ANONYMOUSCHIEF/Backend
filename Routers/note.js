express = require('express');
router = express.Router();
var fetchUser=require('../middleWare/fetchUser')
const { body, validationResult } = require('express-validator');
const Note = require('../modules/Note');// imported Not.js module to use to create user after authentication 
// Route-1:  To create notes with the End point POST: /api/note/createnote . login is required
router.post('/createnote',fetchUser,
  // body is provided  in the thuderclient collection type -json 
  //validaition on email password and name 
  body('title', "title is not valid").isLength({ min: 3 }),
  body('description', "Description should contain atleat 5 charcters ").isLength({ min: 5 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors:errors.array()})
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let note = await Note.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user
      });
      res.json({note});
      
    } catch (error) {
      console.error(error.message)
    return res.status(500).json({error:"internal server error"})
    }
    })
// Route-2:  To fetch all  notes with the End point POST: /api/note/fetchallnotes . login is required
router.get('/fetchallnotes',fetchUser,
  async (req, res) => {
    try {
      userId=req
      const note= await Note.find(userId)
      res.send(note);
    } catch (error) {
      console.error(error.message)
    return res.status(500).json({error:"internal server error"})
    }
  })
  // Route-3:  To Update notes with the End point /api/note/updatenote/:id . login is required
  router.put('/updatenote/:id',fetchUser,
  async (req, res) => {
    try {
      const newNote={}
      if(req.body.title){newNote.title=req.body.title}
      if(req.body.description){newNote.description=req.body.description}
      if(req.body.tags){newNote.tags=req.body.tags}
      let note= await Note.findById(req.params['id'])
      if(!note){return res.status(404).send("not found")}
      if(note.user!==req.user){
        return res.status(401).send("Not allowed")}
      note= await Note.findByIdAndUpdate(req.params['id'],{$set: newNote},{new:true})
      res.json({note})
      
    } catch (error) {
      console.error(error.message)
    return res.status(500).json({error:"internal server error"})
    }
 
  })

   // Route-4:  To Delete  notes with the End point /api/note/updatenote/:id . login is required
   router.delete('/deletenote/:id',fetchUser,
   async (req, res) => {
    try {
      let note= await Note.findById(req.params['id'])
   if(!note){return res.status(404).send("not found")}
   if(note.user!==req.user){return res.status(401).send("Not allowed")}
   note= await Note.findByIdAndDelete(req.params.id)
   res.json([{"success":"your Note has been deleted"},{note}])
      
    } catch (error) {
      console.error(error.message)
    return res.status(500).json({error:"internal server error"})
    }
   
   })
module.exports = router