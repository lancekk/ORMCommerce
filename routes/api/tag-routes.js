const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [Product],
  }).then(tags => {
    res.json(tags);
    return tags;
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    attributes: [
      'id',
      'tag_name'
    ],
    include: [Product],
  }).then(tag => {
    if (!tag) {
      res.status(404).end("{}");
    } else {
      res.status(200).json(tag);
      return tag;
    }
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then(tag => {
    res.status(200).json(tag);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name,
  }, {
    where: {id: req.params.id},
  }).then(t => {
    if (t === 0) {
      res.status(404).json({});
    }
    res.status(200).json(t);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {id: req.params.id}
  }).then(t => {
    res.status(200).json(t);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
