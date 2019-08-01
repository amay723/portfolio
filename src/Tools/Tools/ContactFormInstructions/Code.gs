function doPost(e) {

  // Get POST request event parameters
  var email = e.parameters.email;
  var name = e.parameters.name;
  var description = e.parameters.description;

  // Initialize page return value
  var result = {
    status: 200,
    message: 'Email sent!'
  };

  
  // Missing parameters, return error
  if(!email || !name || !description) {
    result = {
      status: 400,
      message: 'Error: Missing Parameters',
      given: JSON.stringify({email: email, name: name, description: description})
    };
    return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  }
  
  
  // Setup email layout and send
  var myEmail = <your@email.here>;
  var subject = "New contact message from: " + name;
  var body = name + " - " + email;
  body += "\n\n" + description;
  
  GmailApp.sendEmail(myEmail, subject, body);

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  
}