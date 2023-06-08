# club-attendance-frontend

## Components

### Button.vue
* A reusuable button that is designed with a seagull in the gold and white color scheme. To change the color scheme of the seagull, you may so by changing the main color and sub color for class ".button--piyo" and ".button--hoo" in the style
``` 
.button--piyo {
  --main_color: white;
  --sub_color1: #f4e19c;
  --sub_color2: #ff8108;
  --base_color: #000;
  --border_radius1: 60px 60px 40px 40px / 48px 48px 30px 30px;
  --border_radius2: 70px 70px 40px 40px / 48px 48px 30px 30px;
  --border_radius3: 40px 40px 40px 40px / 48px 48px 30px 30px;
}
.button--hoo {
  --main_color: #4993ff;
  --sub_color1: #385082;
  --sub_color2: #fff58f;
  --sub_color3: #fff;
  --base_color: #fff;
  --border_radius1: 50px 50px 50px 50px / 40px 40px 40px 40px;
  --border_radius2: 60px 60px 50px 50px / 40px 40px 40px 40px;
  --border_radius3: 40px 40px 50px 50px / 60px 60px 40px 40px;
  --border_radius3: 50px 50px 45px 45px / 40px 40px 60px 60px;
}
```

### Camera.vue
* A Vue component that captures and decodes QR codes using the device's camera.

* This component consists of a container div that is conditionally displayed if "clubActivity.isCameraAllowed === true". Inside the div, there is a qr-code-stream component imported from the npm package called vue3-qrcode-reader and the documentation is at https://www.vuescript.com/qr-code-reader-vue-3/ . When the Camera.vue is accessed, it triggers the onDecode and onInite async functions.

```
async onInit(promise: any) {
      try {
        await promise;
      } catch (error: any) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    } 
 ```
    
* The onInit is an asynchronous function that handles the initialization of the QR code stream by passing in the paramter 'promise'. The try-catch block  handles the error that could occur during the initialization process. The function checks 'error.name' to determine the type of error and returns it as an error message.

```
async function onDecode(data: string) {
      state.data = data;
      qrCodeStore.qrCode = data;
      console.log(userData.user);

      let info = {
        qrCode: qrCodeStore.qrCode,
        user: userData.user,
        dateOfToday: dateOfToday,
      };
      await qrCodeStore.markAttendence(info);
      state.response = qrCodeStore.qrcodeResponse;
    }
```
* The onDecode is an asynchronous function that is called when a QR code is successfully decoded by the QR code reader by passing in the parameter 'data' which is the decoded data from the qr scan. It calls the qrCodeStore.markAttendance method and passes the info object as a parameter. This method is responsible for handling the attendance marking process or performing some action based on the QR code data and user data. These actions are passed in from the pinia store useQrCode. The response from the onDecode function will then be displayed. 

### ClubActivity.vue
* This component represents a dropdown menu that provides icons that trigger different functionality whether it's navigating to a different page or display specific vue components. Here are the functionalities:

* The dropdown container has three nested components which are 'AddClub', 'DeleteClub', and 'Camera'. These components are conditionally displayed depending on the state in the useclubActivity store. The specific buttons are labeled to inform the user on which button will prompt the specific component.
```
 <ul class="dropdown-item" v-if="clubActivity.isOpen">
        <li>
          <router-link to="/">
            <button @click="signout" class="openscan">Sign Out</button>
          </router-link>
        </li>
        <li v-if="userStore.user?.clientAuthority == 'admin'">
          <router-link to="/teacher">
            <button class="openscan">Teacher</button>
          </router-link>
        </li>
        <li v-if="userStore.user?.clientAuthority == 'admin'">
          <router-link to="/club-origin">
            <button class="openscan">Club Origins</button>
          </router-link>
        </li>
        <li>
          <button @click="clubActivity.openDelete()">Delete Club</button>
        </li>
        <li>
          <router-link to="/clubs">
            <button class="openscan">Clubs</button>
          </router-link>
        </li>
        <li>
          <button @click="clubActivity.showPanel()">Add Club</button>
        </li>
        <li>
          <router-link to="/scanner">
            <button @click="clubActivity.openCamera()" class="openscan">
              Scan QR Code
            </button>
          </router-link>
        </li>
      </ul>
  ```
  * Sign Out" button",when clicked, triggers the signout method and logs out the user by setting userStore.user to null.

```
 methods: {
    signout() {
      this.userStore.user = null;
    },
  },
```

* The buttons Teacher, ClubOrigin, Clubs are all router-link that navigates user to a specific route. Teacher and ClubOrigin buttons are only visible if the userStore.user?.clientAuthority property is equal to "admin". 

```
 <li v-if="userStore.user?.clientAuthority == 'admin'">
          <router-link to="/teacher">
            <button class="openscan">Teacher</button>
          </router-link>
 </li>
 
 <li v-if="userStore.user?.clientAuthority == 'admin'">
          <router-link to="/club-origin">
            <button class="openscan">Club Origins</button>
          </router-link>
 </li>
```

### ClubCard.vue
* This vue component is clubcard container in the /club route. By passing in the props {clubName, meetingDates, position, date, clubCode) in the script, we were able to display the information on the card. The clubName is printed in the 'half' div of the Card and the 'bottom' div of the card contains all the upcoming meeting dates for the particular club by using v-for to iterate through each date element in the array meetingDates.
```
props: {
    clubName: {
      type: String,
      required: true,
    },
    meetingDates: {
      type: Array<string>,
      required: false,
    },
    position: {
      type: String,
      required: false,
    },
    clubCode: {
      type: String,
      required: false,
      default: null,
    },
}
```
* On the very bottom of the clubcard container, there's the icon bar which will only display v-if the user is a president by passing in the ref props.position as shown in the constant ifPresident in setup script. There's a total of five icons in the icon bar and each icon has it own particular @click actions from the corresponding pinia store. 
```
<div class="menubar" v-if="ifPresident">
        <ul v-if="status">
          <li
            @click="
              clubsDescription.openDescription(
                clubCode,
                clubName,
                clubDescription
              )
            "
          >
            <img
              class="edit-description"
              src="../assets/logos/pencil.svg"
              alt="scan"
            />
          </li>
          <li>
            <img
              @click="clubActivity.openMeeting(clubName)"
              class="calendarpic"
              src="../assets/logos/calendar.svg"
            />
          </li>
          <li @click="UploadImage.displayUpload(clubCode, clubName)">
            <img
              @click="clubActivity.openUpload()"
              class="upload"
              src="../assets/logos/upload.png"
              alt="upload"
            />
          </li>
          <li class="member" @click="clubstore.getClubData(clubCode)">
            <router-link to="/president">
              <img class="human" src="../assets/logos/human.svg" alt="human" />
            </router-link>
          </li>
          <li
            class="container"
            @click="qrCode.openMenu(clubCode, dateOfToday, clubName)"
          >
            <img class="qrcode" src="../assets/logos/scanicon.png" alt="scan" />
          </li>
        </ul>
   ```
    
   ### DescriptionBox.vue 
   * This vue component is a replica of ClubCard, but utilized for the description feature of the application. However, for this component more props are passed in such as clubDescription, clubDay, clubAdvisor, clubPresident, etc to provide users. with better understanding of the club. In the 'half' div the clubName is still displayed whereas in the 'bottom' div now contains the clubDescriptions sliced to only 230 characters. The ..Learn More span @click will set the state appear to !appear to display the modal popup containing all the props as listed below:

```
props: {
    clubName: {
      type: String,
      required: true,
    },
    meetingDates: {
      type: Array<string>,
      required: false,
    },
    position: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    clubCode: {
      type: String,
      required: false,
      default: null,
    },
    clubDescription: {
      type: String,
      require: false,
    },
    clubDay: {
      type: String,
      require: false,
    },
    clubAdvisor: {
      type: String,
      require: false,
    },
    clubPresident: {
      type: String,
      require: false,
    },
    clubRoom: {
      type: String,
      require: false,
    },
    clubActivityType: {
      type: String,
      require: false,
    },
    clubFrequency: {
      type: String,
      require: false,
    },
    showItem: {
      type: Boolean,
      require: false,
      default: null,
    },
  },
```
### NewCalendar.vue
* This vue component is the calendar that we utilized for this application and is a npm package called vcalendar with the documentation at https://vcalendar.io/getting-started/installation.html. By using the attributes feature of the vcalendar we were able to pass all the meetingDates and clubName of the particular. The specific date on the calendar that matches the meetingDates will be highlighted in blue and when hovered it will display the popover containing clubName. This feature allows users to keep track of their club events. When the calendar is mounted, the clubData from the useUserDataStore store is passed in as a ref and mapped as transformed array to set all the meetingDates with non-date strings as empty to prevent the calendar from breaking. 

```
onMounted(() => {
      if (clubData !== null) {
        transformedArray.value = clubData.map((club) => {
          if (club.meetingDates[0] === "No meeting date yet.") {
            return {
              clubName: club.clubName,
              meetingDates: [],
            };
          }
          return {
            clubName: club.clubName,
            meetingDates: club.meetingDates,
          };
        });
      }
      console.log(transformedArray);
    });

    let attrs;
    if (objectData.user?.clubData === null) {
      attrs = null;
    } else {
      attrs = computed(() => [
        // Attributes for todos
        ...transformedArray.value!.map((clubData) => ({
          dates: clubData.meetingDates,
          popover: {
            label: clubData.clubName,
          },
          highlight: true,
        })),
      ]);
    }
 ```
### miniButton.vue
* A reusuable button component typically used to close a popup component or navigate back to the particular route. 

### uploadImage.vue
* This vue component has an upload image functionality within a card-box container. It contains the upload button which triggers an input window to select the desired file, and the submit button. When an image is selected, it triggers the "handleImage' method which will verify if the file is valid and reads the file with the 'FileReader' API. The data image URL is stored in pickimage variable and the file is stored in the "imageFile" variable. This component primarily uses the UploadImage store to upload image and handle the response. The resetimage function is meant to reset the state of the store to null or empty string to reset the component and reset image. 

```
   let imageFile: any = null;
    let pickImage: any = ref("");

    async function handleImage(event: any) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        pickImage.value = fileReader.result;
        console.log(pickImage.value);
      });
      fileReader.readAsDataURL(files[0]);
      imageFile = files[0];

      console.log(imageFile);
      UploadImage.file = imageFile;
      console.log(UploadImage.file);
    }

    const clubActivity = useClubActivity();
    const userData = useUserDataStore();
    const UploadImage = useUploadImage();

    function resetImage() {
      clubActivity.closeUpload(),
        (pickImage.value = ref("")),
        UploadImage.$reset();
    }
 ```
 
 
 
 

### ClubBox.vue

* A component used to display basic club information and retrieve club information

```
 props: {
    ClubName: {
      type: String,
      required: true,
    },
    Advisor: String,
    Room: String || Number,
    clubCode: {
      type: String,
      required: true
    }
  },
 ```
* Takes in the club name, advisor name, and club code as props

* Retrieves data using  getClubData function from teacherStore.ts
  
### dateDropdown.vue
* Dropdown used to select the specific club date to retrieve attendance from the backend

Uses the fetchAttendance function from teacherVueStore.ts

```
async fetchAttendance(dates: string, user: any) {
      this.datesCurrent = dates;
      this.datesButton = !this.datesButton;
      this.filterDate = dates;
      console.log(this.filterDate, this.currentClubCode);
      const postData = {
        clubCode: this.currentClubCode,
        attendenceDate: this.filterDate,
        user: user,
      };

      await fetch(this.fetchURL + "get-club-attendence-data", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(postData), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((res) => this.pushCurrentAttendance(res));
    },
  },
});
```

* This function takes in the target date as well as the user's data. With this data, the backend checks if the user has the proper administrative privlidges to access the data and returns the students at the target date

### Status Dropdown

* This component filters student data at a data based on if they were absent or present. 
* It does this with the filterStatus function in teacherVueStore.ts

```
filterStatus(param: string) {
      this.pushStatusFilter(param);
      this.selectedStatus = true;
      console.log(this.currentAttendance);

      if (this.statusFilterCurrent == "Present") {
        this.pushFilteredAttendance(
          this.currentAttendance.filter(
            (student) => student.status == "present"
          )
        );
      }
      if (this.statusFilterCurrent == "Absent") {
        this.pushFilteredAttendance(
          this.currentAttendance.filter((student) => student.status == "absent")
        );
      }
      if (this.statusFilterCurrent == "All") {
        this.pushFilteredAttendance(this.currentAttendance);
      }
    },
```
* This function takes in the param of the selected status (absent or present) and filters the given data at a certain date based on the status of each student. This returns an array of students who fit the correct status

### StudentSearchTable & TableData 

* These two components may be used interchangeably but were seperated for clarity. They display the data obtained when the user selects a club.

```
 props: {
    headings:{
      type: Array<string>,
      required: true,

    } ,
    theData: {
      type: Object,
      required: false
    }
  },
  ```
  * This component takes in an array of strings that serve as the headings (ex. [Osis, Name, Email, Grade])
  * The prop theData is the data returned from selecting a club using the **ClubBox.vue** component.
  
  * The status of an individual in the club is determined via class binding shown below

```
class="test"
        :class="{
          present: data.status === present,
          absent: data.status === absent,
          null: data.status == null,
        }"
      >
      
```


    
 
 ## View
 
 
 ### ClubView.vue
* This is the vue view where all the existing clubs that the user is enrolled in are displayed. The Card component dynamically uses the v-for loop for each existing club within the UserData, and each ClubCard would display the corresponding clubName and meetingDates. The Button component is imported to trigger the modal component on click, is labeled with the current date using the currenDate() method. When the button is clicked it will set isModalVisible to true to display the NewCalendar. vue component. The Camera, ClubActivity, and UploadImage components are also imported in this view. This view has the route /club.

```
<Card
        v-for="club in clubs"
        :clubName="club.clubName"
        :position="club.position"
        :clubCode="club.clubCode"
        :meetingDates="club.meetingDates"
        :showItem="true"
        :clubDescription="club.clubDescription"
        :key="club.clubCode"
      >
      </Card>
 ```
 ``` 
 methods: {
    currentDate() {
      const current = new Date();
      const date = `${
        current.getMonth() + 1
      }/${current.getDate()}/${current.getFullYear()}`;
      return date;
    },
  },
  ```
  
  ### ClubsView.vue
  * This vue view is similar to ClubView.vue except it would only contain the Description Card Component. On mounted, the getClubs async function will trigger which it will fetch from the backend http://localhost:3000/get-all-club-student and the clubs.value which is initally an empty array to the fetched data. This view has the route /clubs.

```
 <DescriptionCard
      v-for="club in clubs"
      :clubName="club.clubName"
      :clubAdvisor="club.advisor"
      :clubPresident="club.president"
      :clubFrequency="club.frequency"
      :clubDay="club.day"
      :clubRoom="club.room"
      :clubActivityType="club.activityType"
      :meetingDates="club.nextMeeting"
      :clubDescription="club.clubDescription"
      :showItem="false"
      :key="club.clubName"
    ></DescriptionCard>
 ```
 
 ```
 let clubs = ref<Array<Clubs> | null>(null);
async function getClubs() {
  const response = await fetch("http://localhost:3000/get-all-club-student");
  const data = await response.json();
  clubs.value = data; // Assuming the fetched data is an array of club objects
}
onMounted(() => {
  getClubs();
}
```

### Scanner.vue
* The view where the Camera component is imported and displayed. This view has the route /scanner and can be navigated with the button within the ClubActivity panel. 


### LoginView.vue
* The login page for the app
* We used the vue3-google-login npm package. More information can be found here (https://www.npmjs.com/package/vue3-google-login) 
* After sign in the response the app will determine if the user is an admin or student. Every account starts as a student and admins need to be set within the clientAuthority section of the google sheets
* Depending on the client authority and the data we have on the user, students may be asked to submit their osis and grade before routing to the ClubView.vue page.

### ErrorView.vue
The 404 page for the app. This may appear when searching for a nonexistent page or when the user does not have the proper administrative permissions to view a page

### StudentSearch.vue
* Used to search for every student participating in clubs
* Uses the component **studentSearchTable** to display student data
**Does NOT SHOW OSIS**

***Retrieving Data***

The student data is retrieved on fulfillment of the async function **getAllStudentData** which takes in the parameter **user**, which represents the user data. The user data is sent to the backend and can be found inside the state of **userData.ts**. The user's data is needed to ensure only admins can see the page by checking their clientAuthority.

This data is then set to the state **allStudentData** which it can be used when needed

***Filters***




* Filter is changed by a dropdown 
```
logValue(){
          console.log(this.searchBy)
          
          if(this.store.currentFilter == "Name"){
                          this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => (student.firstName + student.lastName).replace(/ /g,"").toLowerCase().includes(this.searchBy.toLowerCase().replace(/ /g,""))))
          }
          if(this.store.currentFilter == "Osis"){
                          this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.osis.toLowerCase().includes(this.searchBy.replace(/ /g,""))))
          }
          if(this.store.currentFilter == "Email"){
                          this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.email.toLowerCase().includes(this.searchBy.toLowerCase().replace(/ /g,""))))
          }
          if(this.store.currentFilter == "Official Class"){
                          this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.officialClass.toLowerCase().includes(this.searchBy.toLowerCase().replace(/ /g,""))))
          }
          if(this.store.currentFilter == "Grade"){
                          this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.grade.includes(this.searchBy.toLowerCase().replace(/ /g,""))))
          }
    
      },
``` 
The function logValue filters the student data according to constraints (Grade, Class, Email, Osis, Name)

* To add more constraints an additional header is required in const head
```
      const head = ["Osis","Name","Email","Grade","Official Class"]
```
* And another "if" function will is needed in logValue



### TeacherView.vue 
Page used to display **all clubs** and their student data

**Page is only accessible to admins**

* We use the **clubBox** components to display and retrieve each club's data
* We use the **dateDropdown & statusDropdown** components to filter a selected club's data
* We use the **tableData** component to show a selected club's information

To get the list of school clubs initially, we call the **getData** function from **teacherVueStore.ts** 

```
async getData(user: any) {
      this.loading = true;
      console.log("hi", JSON.stringify(user));
      const res = await fetch(
        "http://localhost:3000/all-club-data",

        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ user }),
        }
      );
      const data = await res.json();

      this.clubList = data;
      this.loading = false;
    },
```

**getData** takes in the user param to check its clientAuthority in the backend to ensure only those with admin privilege will be able to see **every** club data

The computed function **clubData** in **TeacherView.vue** is used to display each club as cards for the user to select. It also filters the club by name based on the user's inputs.
```
    clubData(): Array<eachClub> {
      console.log(this.store.clubList);
      let a =  this.store.clubList.filter((club) =>
        club.clubName.toLowerCase().includes(this.input.toLowerCase())
      );

      return a
```

### presidentView.vue
This page is similar to **TeacherView.vue** however, it is accessible to students who are presidents of clubs.

* Componets used in this page are similar to those of **TeacherView.vue**. Please refer to **TeacherView.vue** for more information.


Determining which club the user is president of
* We use the function userClubPresident
```
userClubPresident(): Array<clubDataInfo> {
      let filterList: any = [];

      this.userStore.user?.clubData.forEach((club) => {
        if (club.position === "president") {
          filterList.push(club);
        }
      });

      let presidentList: any = [];

      filterList.forEach((club: any) => {
        this.store.clubList.forEach((allClub) => {
          if (allClub.clubName == club.clubName) {
            presidentList.push(allClub);
          }
        });
      });

      console.log(presidentList);
      return presidentList;
    },
```

When the user initially logs in, an array of objects showing every club the user participates in and their postion can be found in  **userStore.user.clubData** Using this, we create a seperate array with only those the user is president of



  
  



## Pinia Store

### clubActivity.ts
* This is the pinia store called useClubActivity where we set different states to false and have corresponding actions to trigger and set the boolean condition to true. This store is made to hide certain components when not necessary, and only by clicking on specific buttons or icons would it display the components the user wants.

### uploadImage.ts
* This pinia store called useUploadImage manages the upload image functionality for the application. It has the state object of type 'UploadImg' which contains properties like clubData, file, and sendResponse. clubData is an object of type ClubData that stores information about the club, including clubCode and clubName. The uploadImage action is responsible for uploading the image. It creates a FormData object and appends clubCode, clubName, and file to it. The action then makes a POST request to a specific URL (http://localhost:3000/upload-attendance) with the form data. Upon receiving the response, it updates the sendResponse property with the response value.

```
  displayUpload(clubCode: string, clubName: string) {
      this.clubData.clubCode = clubCode;
      this.clubData.clubName = clubName;
    },
    async uploadImage() {
      let clubData = new FormData();
      const clubCode = this.clubData.clubCode ?? "";
      const clubName = this.clubData.clubName ?? "";

      clubData.append("clubCode", clubCode);
      clubData.append("clubName", clubName);
      clubData.append("file", this.file);

      await fetch("http://localhost:3000/upload-attendance", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: clubData,
      })
  ```
  
  ### deleteMeeting.ts
  * This pinia store is called useDeleteMeeting which is responsible for managing the deletion of meeting dates in an application. The store has a state object of type DeleteDate which includes properties like currentClubName, currentClubMeeting. The store defines actions to manipulate the state. The pushClubName action takes a parameter param and sets the currentClubName property accordingly. Similarly, the pushClubMeeting action sets the currentClubMeeting property. The deleteMDate action is used to delete the specific meeting date by passing in parameters clubName and date. The actions pushClubName and pushClubMeeting to get the specific clubName and date. It then creates a postData object with clubName and date properties and makes a POST request to the specified URL (http://localhost:3000/deleteMeeting) with the JSON data.

```
pushClubName(param: any) {
      this.currentClubName = param;
      console.log(this.currentClubName);
    },
    pushClubMeeting(param: any) {
      this.currentClubMeeting = param;
      console.log(this.currentClubMeeting);
    },

    async deleteMDate(clubName: string | null, date: string | null) {
      this.pushClubName(clubName);
      this.pushClubMeeting(date);
      const postData = {
        clubName: clubName,
        date: date,
      };
      console.log(postData);

      await fetch("http://localhost:3000/deleteMeeting", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(postData), // body data type must match "Content-Type" header
      }).then((res) => res.json());
    },
  },
  ```
  
  
 ### studentSearch.ts
 Pinia store to house function and states used in **StudentSearch.vue**
 
 Functions
 * updateCurrentFilter: Designates the current filter to search through the database of students. 
 * async getAllStudents: Retrieves all students participating in clubs and sets it to the state allStudentData
 * updateFilteredStudentData: sets the given param to the state filteredStudentData



### teacherVueStore.ts
Pinia store used for retrieving club data from backend 

Basic Functions:
* pushClubCode: Sets the given param to the state currentClubCode
* pushCurrentAttendnace: Sets the given param to the state currentAttendance and sets state selectedClub to true. This function is used in the process of getting club data
* pushListOfDates: Sets the given param to the state listOfDates. This function is used when getting a specific club's attendance at a date
* pushFilteredAttendance: Sets the param to the state filteredAttendance. Used when filtering a specifc club's attednance at a date based on their status. (absent, present, all)
* pushStatusFilter: Sets param to state statusFilterCurrent. Used in determining the current filter
* clearPrevData: Sets the following states back to their orginial - {datesCurrent, statusFilterCurrent, datesButton, selectedStatus}

Cooler Functions:
* filterStatus: Filters the data of a club using **pushStatusFilter** and then sets state filteredAttendance to the new filtered attendance
* getData: Gets every club's data. **Must have clientAuthority admin to use**
* getClubData: Gets a **specific** club's data.
* fetchAttendance: Gets a **specific** club's data at a **specific date**. 


### userData.ts
Pinia store used in creating a user and using user data

State: user (Initally Null)

Functions: 
* addUserData: Sets the param to the state user
* addOsis: Sets the param to the user's osis (First time sign in for students)
* addGrade: Sets the param to the user's grade. (First time sign in for students)
* addOfficallClass: Sets the param to the user's officialClass. (First time sign in for students) **Please be aware that the function is MISPELLED as OFFICALL and NOT OFFICIAL. However, the user's respective object property is properly spelled as official. *This is due to Michael Chen's poor spelling* **




