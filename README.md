# club-attendence-frontend

***Views***

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
This vue component is specifically made for the calendar where we downloaded and utilized the npm package vcalendar and the documentation is at "https://vcalendar.io/getting-started/installation.html". 
