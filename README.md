# club-attendence-frontend

***Views***

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

* Retrieves data using  getClubData function from teacherStore.ts
  
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


    
   


  
  
