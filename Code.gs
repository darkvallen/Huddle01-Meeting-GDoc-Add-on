function onOpen(e) {
  DocumentApp.getUi()
      .createMenu('Huddle01 Meeting Add-On')
      .addItem('Create New Meeting', 'createRoom')
      .addItem('Join Meeting', 'joinRoom')
      .addToUi();
}

function createRoom() {

  var apiKey = "YOUR_API_KEY";
  
  var url = "https://api.huddle01.com/api/v1/create-iframe-room";
  
  var data = {
    title: "Huddle01 GDocs Meeting ",
    roomLocked: false
  };
  
  var headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey
  };
  
  var options = {
    "method" : "post",
    "payload" : JSON.stringify(data),
    "headers" : headers
  };
  
  var response = UrlFetchApp.fetch(url, options);
  
  if (response.getResponseCode() === 200) {
    var json = JSON.parse(response.getContentText());
    var meetingLink = json.data.meetingLink;
    DocumentApp.getUi().alert('Room Created!\nMeeting Link: ' + meetingLink); 
  } else {
    DocumentApp.getUi().alert('Error creating room.', response.getContentText());
  }
}

function joinRoom() {
  var meetingLink = DocumentApp.getUi().prompt('Enter Meeting Link').getResponseText();
  if (meetingLink) {
    var html = HtmlService.createTemplateFromFile('Meeting');
    html.meetingLink = meetingLink;
    var sidebar = html.evaluate()
      .setTitle('Huddle01 GDocs Meeting')
      .setWidth(400)
      .setHeight(600);
    DocumentApp.getUi().showSidebar(sidebar);
  }
}

