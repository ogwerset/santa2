const mongoose = require('mongoose');
const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  preferences: { type: String, required: true },
  slot: { type: Number, required: true, unique: true },
  password: { type: String, required: true }
})

const cors = require('cors');
const { app } = require('./app');


app.use(cors());

// Participant Model
const Participant = mongoose.model('Participant', participantSchema);

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://czlowiek0suchar:<twojstary>@cluster0.0tafwlx.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes

// Add a new participant
 app.post('/participants',async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    res.status(201).send(newParticipant);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all participants
 app.get('/participants',async (req, res) => {
  try {
    const participants = await Participant.find();
    res.send({ data: participants });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', (req, res) => {
  res.send('Secret Santa App Backend');
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
