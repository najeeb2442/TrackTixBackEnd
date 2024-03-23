const Invite = require('../models/invite.js')
const Team = require('../models/team.js')
const User = require('../models/user.js')
const Role = require('../models/role.js')

const index = async (req, res) => {
  //done
  try {
    // .populate(["member", "createdBy", "solvedBy"]);
    let invites = await Invite.find({ member: req.params.id }).populate([
      {
        path: 'sender',
        model: 'User'
      },
      {
        path: 'member',
        model: 'User'
      },
      {
        path: 'team',
        model: 'Team'
      }
    ])
    res.json(invites)
  } catch (err) {
    res.json({ error: err.message })
  }
}

const show = async (req, res) => {
  // done
  try {
    const invite = await Invite.findById(req.params.id).populate([
      'sender',
      'member',
      'team'
    ])

    res.json(invite)
  } catch (err) {
    res.json({ error: err.message })
  }
}

// i am here right now
// sender email team

const newInvite = async (req, res) => {
  //done
  try {
    const user = await User.findOne({ email: req.body.member })

    if (user) {
      req.body.member = user._id
      const invite = await Invite.create(req.body)
      // const
      await User.updateOne(
        { _id: req.body.member },
        { $push: { invites: invite._id } }
      )
      res.send('Invite Created')
    }
    res.json('email not found')
  } catch (err) {
    res.json({ error: err.message })
  }
}

const updateInvite = async (req, res) => {
  try {
    // req.body.status = true
    const invite = await Invite.findById(req.params.id)

    if (req.body.status == true) {
      await User.updateOne(
        { _id: invite.member },
        { $push: { teams: invite.team } }
      )
    }
    await User.updateOne(
      { _id: invite.member },
      { $pull: { invites: invite._id } }
    )
    await Invite.deleteOne({ _id: req.params.id })
    res.json('updated')
  } catch (err) {
    res.json({ error: err.message })
  }
}

// const deleteInvite = async (req, res) => {
//   try {
//     // if (res.locals.payload) {
//     //   if (
//     //     res.locals.payload.role == "Admin" ||
//     //     res.locals.payload.role == "customer"
//     //   ) {
//     //   }
//     // }

//     await Invite.deleteOne({ _id: req.params.id }).exec()
//     res.json(true)
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// }

module.exports = {
  // deleteInvite,
  updateInvite,
  newInvite,
  index,
  show
}
