const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Carefield Pleasanton',
  });
});

router.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Carefield Pleasanton',
  });
});

router.get('/photos', (req, res) => {
  res.render('photos.hbs', {
    title: 'Photo Gallery',
  });
});

router.get('/floor-plans', (req, res) => {
  res.render('floor-plans.hbs', {
    title: 'Floorplans',
  });
});

router.get('/memory-care', (req, res) => {
  res.render('memory-care.hbs', {
    title: 'Memory Care',
  });
});

router.get('/activities', (req, res) => {
  res.render('activities.hbs', {
    title: 'Events & Activities',
  });
});

router.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    title: 'Contact Us',
  });
});

module.exports = router;
