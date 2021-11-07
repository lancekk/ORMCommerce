const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  }).then(cats => {
    res.status(200).json(cats);
    return cats;
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},
    include: [Product],
  }).then(cat => {
    if (cat) {
      res.status(200).json(cat);
    } else {
      res.status(404).json({});
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then(cat => {
    res.status(200).json(cat);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name,
  }, {
    where: {id: req.params.id},
  }).then(num => {
    if (num[0] !== 0) {
      res.status(200).json(num);
    } else {
      res.status(404).json({});
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send("");
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  }).then(num => {
    if (num !== 0) {
      res.status(200).json(num);
    } else {
      res.status(404).json({});
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send("");
  });
});

module.exports = router;
