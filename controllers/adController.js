const AdModel = require('../models/adModel')
const asyncHandler = require('express-async-handler')
const AuthModel = require('../models/authModel')

// POST ADS
const postAd = asyncHandler(async (req, res) => {
  const user = req.user

  if (!req.files || req.files.length < 1) {
    throw new Error('Please include at least one image')
  }

  const filenames = req.files.map((file) => file.filename)

  const { title, description, brand, condition, location, price, category } =
    req.body

  if (
    !title ||
    !description ||
    !brand ||
    !condition ||
    !req.files ||
    !location ||
    !price ||
    !category
  ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const data = {
    title,
    description,
    brand,
    condition,
    images: filenames,
    location,
    price,
    category,
    user: user._id,
  }

  const doc = new AdModel(data)

  await doc.save()
  if (doc) {
    res.json({ successMsg: 'Your ad has been published' })

    // add item to user array
    const updateUserItem = await AuthModel.findOneAndUpdate(
      { _id: doc.user._id },
      {
        $push: { ads: doc._id },
      }
    )
  } else {
    throw new Error('could not save your ad')
  }
})