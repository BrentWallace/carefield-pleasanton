const express = require('express');
const sgMail = require('@sendgrid/mail');

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

router.post('/contact', (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { fromEmail, firstName, lastName, phone, referralSource, inquiringFor, brochure, tour, comments } = req.body;
  const msg = {
    to: 'bwallace@carefieldliving.com',
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
  try {
    sgMail.send(msg);
  } catch (e) {
    return res.status(500).send('There was a problem sending your inquiry. Please contact us by phone at 925-461-8409');
  }
  return res.send('Thank you for your inquiry! Our Community Relations Director will be in touch with you soon to help answer your questions.');
});

module.exports = router;
