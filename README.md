# club-attendence-frontend

***Views***

**ClubView.vue**
This is the vue view where all the existing clubs that the user is enrolled in are displayed. The Card component dynamically uses the v-for loop for each existing club within the UserData, and each ClubCard would display the corresponding clubName and meetingDates. The Button component is imported to trigger the modal component on click, is labeled with the current date using the currenDate() method. When the button is clicked it will set isModalVisible to true to display the NewCalendar.vue component. 

**ClubsView.vue**
This vue view is where all the description cards for all the clubs are displayed. It holds the DescriptionCard component which uses the v-for to interate through each club in the clubs array. This component is populated with club-specific data such as the club name, advisor, president, meeting frequency, meeting day, meeting room, activity type, next meeting dates, and club description. The getClubs function is an asynchronous function that fetches the club data from a specified API endpoint (http://localhost:3000/get-all-club-student in this case). 

**Scanner.vue**
This vue view is where the Camera component is displayed, and this route can be navigated to by clicking on the QRCode icon button in the clubActivity.vue or the (+) button on the bottom right.

***Components***

**Button.vue**
This is the vue component for the seagull button and all the classes for the elements are labeled. If you want to change the color scheme of the seagull, you may do so by changing the main color and sub color for class ".button--piyo" and ".button--hoo" in the style. The Button is exported and can be imported for use.

**Camera.vue**
For this project we installed a npm package called vue3 qr reader and the documentation is at "https://www.vuescript.com/qr-code-reader-vue-3/". After we imported the component QrcodeStream from the package and called it in the template. The component can only be displayed if the state club.Activity.isCameraAllowed is true. When opened, the browser will prompt the user for camera access and the result or error of the qr code scan will be displayed at the bottom.

**ClubActivity.vue**
This vue component contains the (+) located near the bottom right of the ClubView.vue or /club route and serves the purpose of navigating to the QR Scanner as well as adding clubs and navigating to the /teacher route. The function show() in the setup script is what prompts the dropdown to appear and clubActivity.isOpen is passed from the clubActivity.ts file in the stores pinia folder. The actions clubActivity.closeMenu() and clubActivity.openMenu() is used in the if conditional statement depending upon whether the state of clubActivity.isOpen is true or false. In the template, the "Teacher" dropdown button navigates to the /teacher route. The "Add Club" dropdown button has the function clubActivity.showPanel() on click which prompts the state clubActivity.isPanelVisible to turn to true in order to display the AddClub component. The "Scan QR Code" dropdown button is a router-link to navigate to the /scanner route and has the function clubActivity.openCamera() on click to prompt state club.isCameraVisible to turn to true in order to display the Camera component.

**ClubCard.vue**
This vue component displays each clubcard container in the /club route. By passing in the props {clubName, meetingDates, position, date, clubCode) in the script, we were able to display the information on the card. The clubName is printed in the upperhalf of the Card and the bottom half of the card contains all the upcoming meeting dates for the particular club by using v-for to iterate through each date element in the array meetingDates. On the very bottom, we have the menubar which would only be displayed when the v-if statement is true, and in this case the ifPresident condition is only fulfilled if the user has a position of president which is passed in as a prop previously indicated. There's a total of four icons within the menubar. The "member" icon is a router-link that would navigate the user to the /member route where all members are displayed and on click the clubstore.getClubData function from pinia file sendcode.ts and the specific clubCode is passed in as a parameter to get an array of all the members for that specific club. The "upload" icon on click will trigger the pinia action clubActivity.openUpload() to turn the state isUploadVisible to true and display the component UploadImage.

**NewCalendar.vue**
This vue component is specifically made for the calendar where we downloaded and utilized the npm package vcalendar and the documentation is at "https://vcalendar.io/getting-started/installation.html". You can look at the Layout and Attributes section of the documentation to adjust the vcalendar to your likings.

**QRScanner.vue**
This vue component is a modal popup that displays a QR code for creating attendance for a club. The component consists of a backdrop, a modal container, and various elements inside it. It includes a close button, the club name, a message asking whether to create attendance for the current date, a "Yes" button to generate the QR code, the QR code image itself, a message indicating the QR code's expiration time, and a countdown timer displaying the remaining minutes and seconds. The component uses the useQrCode store to manage the QR code generation. On mounted, the store is initialized to generate the QR Code. By clicking the "Yes" button triggers the getQrCode method, which calls the appropriate store functions and starts the countdown timer. Once the timer reaches zero, the action is cleared and timer is reset and clears the QR code.

**miniButton.vue**
Just a button component frequently imported to different components or routes as a method for closing a component.

**uploadImage.vue**
This vue component has a uplaod image functionality within a card-box container. It contains the upload button which triggers an input window to select the desired file, and the submit button. When an image is selected, it triggers the 'handleImage' method which will verify if the file is valid and reads the file with the 'FileReader' API. Th data image URL is stored in pickImage variable and the file is stored in the "imageFile" variable. This component primarily uses the UploadImage store to upload image and handle the response. The resetImage function is meant to reset the state of the store to null or empty string to reset the component and reset image. 

**DescriptionBox.vue**
This vue component represents the description card which is basically similar to the ClubCard component, but this one has more props data passed from the ClubsView.vue view. It displays information about the club such as its name, code, description, advisor, president, meeting frequency, meeting day, meeting room, activity type, and next meeting dates. The preview description is sliced to about 230 characters and only by clicking on the ..Learn More button would the modal container appear to display datas like name, code, description, advisor, president, meeting frequency, meeting day, meeting room, activity type, and next meeting dates.

**store**

**clubActivity.ts**
This is the pinia store called useClubActivity were we set different states to false and have corresponding actions to trigger and set the boolean condition to true. This store is made to hide certain components when not necessary, and only by clicking on specific buttons or icons would it display the components the user wants. 

**uploadImage.ts**
This pinia store called useUploadImage manages the upload image functionality for the the application. It has the state object of type 'UploadImg' which contains properties like clubData, file, and sendResponse. clubData is an object of type ClubData that stores informations about the club, including clubCode and clubName. The uploadImage action is responsible for uploading the image. It creates a FormData object and appends clubCode, clubName, and file to it. The action then makes a POST request to a specific URL (http://localhost:3000/upload-attendance) with the form data. Upon receiving the response, it updates the sendResponse property with the response value.

**deleteMeeting.ts**
This pinia store is called useDeleteMeeting which is responsible for managing the deletion of meeting dates in an application. The store has a state object of type DeleteDate which includes properties like currentClubName, currentClubMeeting. The store defines actions to manipulate the state. The pushClubName action takes a parameter param and sets the currentClubName property accordingly. Similarly, the pushClubMeeting action sets the currentClubMeeting property. The deleteMDate action is used to delete the specific meeting date by passing in parameters clubName and date. The actions pushClubName and pushClubMeeting to get the specific clubName and date. It then creates a postData object with clubName and date properties and makes a POST request to the specified URL (http://localhost:3000/deleteMeeting) with the JSON data.
