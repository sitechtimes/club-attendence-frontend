# club-attendence-frontend

***Views***

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



***Components***

**ClubBox.vue**

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

* Retrieves data using  **getClubData** function from **teacherVueStore.ts**

```
async getClubData(clubCode: string, user: any, ClubName: string)
```
Takes in the selected clubCode, the current user, and the ClubName
* We get clubCode and ClubName from the props when we originally use the component
* This information is sent to the backend via postman as an object

```
const postData = {
        clubCode: clubCode,
        user: user,
        clubName: ClubName,
      };

      await fetch(this.fetchURL + "one-club-data", {
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
```

The response is then pushed to **teacherVueStore.ts**'s state as currentAttendance

Now that we have the club's student data, we need to get the dates the club is active. This is still done within the getClubData function with another fetch request
```
await fetch(this.fetchURL + "get-club-attendence-date", {
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
        body: JSON.stringify(postData),
      })
        .then((dates) => dates.json())
        .then((dates) => this.pushListOfDates(dates));
    },
```
Be aware that we are still sending postData in the body but since we already defined what postData was when we got the club's student data, we can simply use that instance of postData in the body.









  
**dateDropdown.vue**
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

**Status Dropdown**

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

**StudentSearchTable & TableData** 

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


    
   


  
  
