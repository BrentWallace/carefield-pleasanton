const express = require('express');
const sgMail = require('@sendgrid/mail');
const { check, validationResult } = require('express-validator');

const router = new express.Router();

router.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Carefield Pleasanton Memory Care',
    description: 'Carefield Pleasanton Memory Care is a memory care communty in Pleasanton, California. Carefield Pleasanton offers an engaging and varied lifestyle that empowers individuals to enjoy creative pursuits, refine skills, revisit old hobbies, and discover new passions in a family environment.',
    jsonld: `{
      "@context": "https://schema.org",
      "@type": "localBusiness",
      "image": "https://carefieldpleasanton.com/img/hero-slide-1.jpg",
      "logo": "https://carefieldpleasanton.com/img/carefield-pleasanton-logo.png",
      "address": {
        "@type": "postalAddress",
        "addressLocality": "Pleasanton",
        "addressRegion": "CA",
        "postalCode": "94566",
        "streetAddress": "4115 Mohr Ave."
      },
      "name": "Carefield Pleasanton Memory Care",
      "url": "https://carefieldpleasanton.com",
      "telephone": "+19254618409",
      "sameAs": ["https://www.facebook.com/carefieldpleasanton"]
    }`,
  });
});

router.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Carefield Pleasanton Memory CAre',
  });
});

router.get('/photos', (req, res) => {
  res.render('photos.hbs', {
    title: 'Photo Gallery - Carefield Pleasanton Memory Care',
    photos: [
      { src: '/img/gallery/CarefieldLivingPleasanton-1.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-2.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-3.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-4.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-5.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-6.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-7.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-8.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-9.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-10.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-11.jpg' },
      { src: '/img/gallery/CarefieldLivingPleasanton-12.jpg' },
    ],
  });
});

router.get('/videos', (req, res) => {
  res.render('videos.hbs', {
    title: 'Videos - Carefield Pleasanton Memory Care',
  });
});

router.get('/floor-plans', (req, res) => {
  res.render('floor-plans.hbs', {
    title: 'Floorplans - Carefield Pleasanton Memory Care',
  });
});

router.get('/memory-care', (req, res) => {
  res.render('memory-care.hbs', {
    title: 'Carefield Pleasanton Memory Care',
  });
});

router.get('/activities', (req, res) => {
  res.render('activities.hbs', {
    title: 'Events & Activities - Carefield Pleasanton Memory Care',
  });
});

router.get('/covid-19', (req, res) => {
  res.render('covid.hbs', {
    title: 'COVID-19 - Carefield Pleasanton Memory Care',
  });
});

router.get('/sitemap.xml', (req, res) => {
  const file = `${__dirname}/../public/sitemaps/sitemap.xml`;
  res.download(file);
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /*\nSitemap: https://carefieldpleasanton.com/sitemap.xml');
});

router.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    title: 'Contact Us - Carefield Pleasanton Memory Care',
  });
});

router.post('/contact', [
  check('fromEmail').isEmail().normalizeEmail(),
  check('firstName').trim().escape(),
  check('lastName').trim().escape().notEmpty(),
  check('phone').isMobilePhone('en-US'),
  check('referralSource').trim().escape(),
  check('inquiringFor').trim().escape(),
  check('brochure').trim().escape(),
  check('tour').trim().escape(),
  check('comments').trim().escape(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send();
  }
  const toEmail = process.env.EMAIL_RECIPIENT.split(',');
  const { fromEmail, firstName, lastName, phone, referralSource, inquiringFor, brochure, tour, comments } = req.body;
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: `Carefield Pleasanton Contact Form: ${firstName} ${lastName} - ${fromEmail}`,
    text: `${firstName} ${lastName} has submitted an inquiry through the contact form on carefieldpleasanton.com. They can be contacted by phone at ${phone} and by email at ${fromEmail}.\r\nInquiring for:${inquiringFor}\r\nReferred by: ${referralSource}\r\nBrochure:${brochure}\r\nTour:${tour}\r\n\r\nMessage start: ${comments}`,
    html: `
      <h1>New Contact Form Submission</h1>
        <p><strong>${firstName} ${lastName}</strong> has submitted an inquiry through the contact form on carefieldpleasanton.com.</p>
        <h2>Contact Details</h2>
        <ul>
          <li>Email: ${fromEmail}</li>
          <li>Phone: ${phone}</li>
          <li>Referred by: ${referralSource}</li>
          <li>Inquiring for: ${inquiringFor}</li>
          <li>Brochure: ${brochure}</li>
          <li>Tour: ${tour}</li>
        </ul>
        <h2>Message Start:</h2>
        <p>${comments}</p>
        `,
  };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(msg);
  return res.send('Thank you for your inquiry! Our Community Relations Director will reach out to you shortly.');
});

module.exports = router;
