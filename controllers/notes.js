const db = require("../db");
const { v4: uuidv4 } = require("uuid");

// get all notes - Get all from Database
async function getNotes(req, res) {
  var params = {
    TableName: process.env.tableName,
  };
  db.scan(params, function (err, data) {
    if (err) {
      res.status(500).json({
        error: "Could not load items: " + err,
      });
    } else {
      res.json(data.Items);
    }
  });
}

// create note - Insert into Database
async function createNote(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: "Please enter a title and content",
    });
  }
  // Create a new note
  var params = {
    TableName: process.env.tableName,
    Item: {
      noteId: uuidv4(),
      createdAt: Date.now(),
      title: title,
      content: content,
    },
  };
  db.put(params, function (err) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.status(500).json({ error: "Could not create item: " + err });
    } else {
      console.log("Added item:", JSON.stringify(params, null, 2));
      res.json({
        noteId: params.Item.noteId,
        createdAt: params.Item.createdAt,
        title: params.Item.title,
        content: params.Item.content,
      });
    }
  });
}

// Get Note by id

async function GetNoteById(req, res) {
  const noteId = req.params.noteId;
  var params = {
    TableName: process.env.tableName,
    Key: {
      noteId: noteId,
    },
  };
  db.get(params, function (err, data) {
    if (err) {
      res.status(500).json({
        error: "Could not load item: " + err,
      });
    } else {
      res.json(data.Item);
    }
  });
}

async function UpdateNoteById(req, res) {
  const noteId = req.params.noteId;
  const { title, content } = req.body;
  var params = {
    TableName: process.env.tableName,
    Key: {
      noteId: noteId,
    },
    UpdateExpression: "set title = :t, content = :c",
    ExpressionAttributeValues: {
      ":t": title,
      ":c": content,
    },
    ReturnValues: "UPDATED_NEW",
  };
  db.update(params, function (err, data) {
    if (err) {
      res.status(500).json({
        error: "Could not update item: " + err,
      });
    } else {
      res.json(data.Attributes);
    }
  });
}

async function DeleteNoteById(req, res) {
    const noteId = req.params.noteId;
    var params = {
        TableName: process.env.tableName,
        Key: {
        noteId: noteId,
        },
    };
    db.delete(params, function (err, data) {
        if (err) {
        res.status(500).json({
            error: "Could not delete item: " + err,
        });
        } else {
        res.json({ success: "Item deleted successfully" });
        }
    });

}
// Sample query code from another source
// async function fetchDatafromDatabase3() {
//   // query method fetch data from dynamodb
//   var id = "ANPL2032231213";
//   var Dept = "Sales";
//   var params = {
//     TableName: empTable,
//     KeyConditionExpression: "#id = :id",
//     ExpressionAttributeNames: {
//       "#id": "id",
//       "#dept": "Dept",
//     },
//     ExpressionAttributeValues: {
//       ":id": id,
//       ":deptValue": Dept,
//     },
//     FilterExpression: "#dept = :deptValue", //AttributeName with attributeValue
//     Limit: 5,
//     ScanIndexForward: false, // Set ScanIndexForward to false to display most recent entries first
//   };

//   let queryExecute = new Promise((res, rej) => {
//     dynamoDB.query(params, function (err, data) {
//       if (err) {
//         console.log("Error", err);
//         rej(err);
//       } else {
//         console.log("Success! query method fetch data from dynamodb");
//         res(JSON.stringify(data, null, 2));
//       }
//     });
//   });
//   const result = await queryExecute;
//   console.log(result);
// } 

module.exports = {
  getNotes,
  createNote,
  GetNoteById,
  UpdateNoteById,
  DeleteNoteById,
};
