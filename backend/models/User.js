const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: { type: [String], default: [] } // Array of strings (recipe IDs)
});

module.exports = mongoose.model('User', UserSchema);