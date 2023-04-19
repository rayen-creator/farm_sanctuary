const Room = require("../models/Convroom");

module.exports = {
    getAllRooms: async (req, res) => {
      const { User1_param } = req.params;
      try {
        const rooms = await Room.find(
          { $or: [
          {
            User1: User1_param,
          },
          {
            User2: User1_param,
          },
        ],});
        res.status(200).json(rooms );
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  getroombyuser12: async (req, res) => {
    const { User1_param, User2_param } = req.params;
    console.log(req.params);
    const room = await Room.findOne({
      $or: [
        {
          User1: User1_param,
          User2: User2_param,
        },
        {
          User1: User2_param,
          User2: User1_param,
        },
      ],
    });
    if (room) {
      return res.status(200).json({
        room: room.ConvName,
      });
    } else {
      return res.status(200).json({
        room: null,
      });
    }
  },

  creatrome: async (req, res) => {
    try {
      const { User1_param, User2_param } = req.params;
      const Existingrome = await Room.findOne({
        $or: [
          {
            User1: User1_param,
            User2: User2_param,
          },
          {
            User1: User2_param,
            User2: User1_param,
          },
        ],
      });

      if (Existingrome) {
        return res.status(200).json({
          room: Existingrome.ConvName,
        });
      } else {
        const createdroom = Room.create({
          User1: User1_param,
          User2: User2_param,
          ConvName: req.body.ConvName,
        });
        return res.status(200).json({ room: createdroom.ConvName });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteroom: async (req, res) => {
    try {
      const room = await Room.findOne(req.body.ConvName);
      if (room) {
        await room.remove();
      }
      res.status(200).json({ room: room });
    } catch (error) {
      res.status(500).json(ConvName);
    }
  },
}
