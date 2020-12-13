


export const getApplications = db => (req, res) => {
  const collection = db.collection(req.params.clientId);
  // Find some documents
  collection.find({name: 'config'}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
    res.json(docs);
  });
}
