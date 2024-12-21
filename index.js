const mongoose = require("mongoose");
const express = require("express");
const person = require("./model/personData");
const connectDB = require("./db/dbConnect");
const cors = require("cors")
const dotenv = require("dotenv");

let app = express();
app.use(express.json());
app.use(cors())


dotenv.config();

connectDB();

app.post("/persons", async (req, res) => {
  try {
    let data = req.body; // Extract the request body

    // Create a new person entry in the database
    const response = await person.create(data);

    return res.status(201).json({
      success: true,
      response,
    });
  } catch (error) {
    // Handle duplicate key error (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A record with this unique field already exists!",
      });
    }

    // Log and handle other server errors
    console.error("Error creating person:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the person.",
      error: error.message,
    });
  }
});


app.get("/persons", async (req,res) => {
  try {
    const persons = await person.find()
    return res.status(200).json({
      success: true,
      persons
    });
  } catch (error) {
       console.log(error);
    return res.status(500);
  
  }
  
})
app.get('/persons/:id', async (req, res) => {
  const { id } = req.params; // Use query parameters for GET request
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID parameter is required',
      });
    }

    const singlePerson = await person.findById(id); // Fetch person by ID
    if (!singlePerson) {
      return res.status(404).json({
        success: false,
        message: 'Person not found',
      });
    }

    return res.status(200).json({
      success: true,
      singlePerson,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the person',
    });
  }
});

 // my code 
//  app.post("/person", async (req, res) => {
//   try {
//     const data = req.body;  
//     if (!data.name || !data.email || !data.password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and password are required.",
//       });
//     }
//     const response = await person.create(data)
//     return res.status(200).json({
//       success: true,
//       message: "Person Added",
//       data: response,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while adding the person.",
//     });
//   }
//  });

app.put("/persons/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body; // Use query parameters for GET request
  try {
        // Validate the request body
        if (!data || Object.keys(data).length === 0) {
          return res.status(400).json({
            success: false,
            message: 'No data provided for update',
          });
        }
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID parameter is required',
      });
    }

    const updatePerson = await person.findByIdAndUpdate(id ,data,{new:true}); // Fetch person by ID
    if (!updatePerson) {
      return res.status(404).json({
        success: false,
        message: 'Person not found',
      });
    }

    return res.status(200).json({
      success: true,
      updatePerson,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the person',
    });
  }
})

app.delete('/persons/:id', async (req, res) => {
  const { id } = req.params; // Use query parameters for GET request
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID parameter is required',
      });
    }

    const deletedPerson = await person.findByIdAndDelete(id); // Fetch person by ID
    if (!deletedPerson) {
      return res.status(404).json({
        success: false,
        message: 'Person not found',
      });
    }

    return res.status(200).json({
      success: true,
      deletedPerson,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the person',
    });
  }
});

 app.listen(8000, () => {
    console.log('server running')
 })