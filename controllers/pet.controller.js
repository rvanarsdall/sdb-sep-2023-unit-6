const router = require("express").Router();

const Pet = require("../models/pet.model");

const validateSession = require("../middleware/validate-session");

/* 
Everything in this file will be reached by the following:
http://localhost:4000/pet
*/

/* 
Route:  localhost:4000/pet/add
Request Type: POST
Description: Create a new pet post
*/
router.post("/add", validateSession, async (req, res) => {
  try {
    console.log(req.user);
    const { title, description, imageURL } = req.body;

    const pet = new Pet({
      title: title,
      description: description,
      imageURL: imageURL,
      ownerId: req.user._id,
    });

    const newPet = await pet.save();

    res.json({
      message: "success from add",
      pet: newPet,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* 
Route: localhost:4000/pet/view-all
Request Type: GET
Description: View all the pets in the DB
*/

router.get("/view-all", validateSession, async (req, res) => {
  try {
    console.log("req.user", req.user._id);
    const pets = await Pet.find().populate("ownerId", "firstname lastname");

    res.json({ message: "success from get", pets: pets });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* 
Route: localhost:4000/pet/delete/:id
Request Type: DELETE
Description: Delete a pet post from the DB
*/
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    const id = req.params.id;
    //  delete from the Pet collection where the id matches the _id in the req.params.id
    const conditions = {
      _id: id,
      ownerId: req.user._id,
    };

    const pet = await Pet.deleteOne(conditions);
    console.log(pet);
    res.json({
      message:
        pet.deletedCount === 1
          ? "success pet was deleted"
          : "failure pet was not deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* 
Route: localhost:4000/pet/update/:id
Request Type: PATCH
Description: Update a pet post from the DB

findOneAndUpdate.
- Takes 3 arguments
- Conditions to find the document
- What we want to update (object form comes from the req.body)
- options (new: true) will return the updated document
*/

router.patch("/update/:id", validateSession, async function (req, res) {
  try {
    const id = req.params.id;
    const conditions = { _id: id, ownerId: req.user._id };
    const data = req.body;
    const options = { new: true };

    const pet = await Pet.findOneAndUpdate(conditions, data, options);

    if (!pet) {
      throw new Error("Pet was not found");
    }

    res.json({
      message: "success from update",
      pet: pet,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
