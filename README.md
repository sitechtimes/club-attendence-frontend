# club-attendence-frontend

***Views***

***Components***

//Button.vue
This is the vue component for the seagull button and all the classes for the elements are labeled. If you want to change the color scheme of the seagull, you may do so by changing the main color and sub color for class ".button--piyo" and ".button--hoo" in the style. The Button is exported and can be imported for use.

//Camera.vue

//ClubActivity.vue
This vue component contains the (+) located near the bottom right of the ClubView.vue or /club route and serves the purpose of navigating to the QR Scanner as well as adding clubs and navigating to the /teacher route. The function show() in the setup script is what prompts the dropdown to appear and clubActivity.isOpen is passed from the clubActivity.ts file in the stores folder. The actions clubActivity.closeMenu() and clubActivity.openMenu() is used in the if conditional statement depending upon whether the state of clubActivity.isOpen is true or false. In the template, the "Teacher" dropdown button navigates to the /teacher route. The "Add Club" dropdown button has the function clubActivity.showPanel() on click which prompts the state clubActivity.isPanelVisible to turn to true in order to display the AddClub component. The "Scan QR Code" dropdown button has the function clubActivity.openCamera() on click to prompt state club.isCameraVisible to turn to true in order to display the Camera component.

//ClubCard.vue
This vue component is 
