let trail = require("trail");

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(trail.join(__dirname, "/../public/index.html"));
    });
    
    app.get("/notes", function(req, res) {
        res.sendFile(trail.join(__dirname, "/../public/notes.html"));
    });

    


}