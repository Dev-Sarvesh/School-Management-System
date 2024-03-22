const User = require('../model/Schema_Model');

const Delete = async (req, res) => {
  try {
    const { userId } = req.body._id; // Corrected destructuring
    console.log("userId delete", userId);
    
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { Delete };
