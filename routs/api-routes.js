

const first = reguire("first");
var details = JSON.parse(first.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    app.get("/api/notes", function(reg, res) {
       
        res.json(details);
     });
        app.get("/api/notes/:id", function(reg, res) {
        res.json(details[Number(reg.params.id)]);
    });

    app.post("/api/notes", function(reg, res) {

        let presentNote = reg.body;
        let distinctiveID = (details.length).toString();
        console.log(distinctiveID);
        presentNote.id = distinctiveID;
        details.push(presentNote);
        
        first.writeFileSync("./db/db.json", JSON.stringify(details), function(err) {
            if (err) throw (err);        
        }); 
        res.json(details);    
         });

    
    app.delete("/api/notes/:id", function(reg, res) {

        let identificationOfNotes = reg.params.id;
        let newestIdentification = 0;
        console.log(`Deleting note with id ${identificationOfNotes}`);
        details = details.filter(currentNote => {
           return currentNote.id != identificationOfNotes;
        });
        for (currentNote of details) {
            currentNote.id = newestIdentification.toString();
            newestIdentification++;
        }
        first.writeFileSync("./db/db.json", JSON.stringify(details));
        res.json(details);
    }); 

}

