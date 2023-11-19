// https://console.cloudinary.com/pm/c-0236d8e8f5438bc7b755938874399d/getting-started => To set up cloudinary config

const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: 'dtscrzs6m', 
  api_key: '492754149167612', 
  api_secret: 'nUJZ5XtXAtnZ29foNA2lwZQopfw' 
});

module.exports = cloudinary;