var express = require("express");
var mongoose = require("mongoose");
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://elafuser:Ee0503381491-@cluster0.q8zuxdw.mongodb.net/myprojectDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas!');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String
});

const Project = mongoose.model('Project', ProjectSchema);

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (error) {
    res.json({ statusCode: 500, message: "Error fetching projects", error });
  }
});

var port = process.env.port || 3000;
app.listen(port, () => {
  console.log("App listening on port: " + port);
});
