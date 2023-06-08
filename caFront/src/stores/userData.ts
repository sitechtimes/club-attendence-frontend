import { defineStore } from "pinia";

type UserObject = {
  email: string;
  president: boolean;
  emailDomain: string;
  firstName: string;
  grade: string;
  lastName: string;
  officialClass: string;
  osis: string;
  clubData: [
    {
      clubCode: string;
      clubName: string;
      position: string;
      meetingDates: Array<string>;
      clubDescription: string;
    }
  ];
  clientAuthority: string;
  uid: string;
};
interface UserState {
  user: null | UserObject;
}

export const useUserDataStore = defineStore("userData", {
  state: (): UserState => ({
    user: null,
  }),
  getters: {},
  actions: {
    addUserData(data: UserObject) {
      this.user = data;
    },
    addOsis(osis: string) {
      this.user!.osis = osis;
    },
    addGrade(grade: string) {
      this.user!.grade = grade;
    },
    addOfficallClass(officalClass: string) {
      this.user!.officialClass = officalClass;
    },
    removeClub(clubName: string) {
      for (let i = 0; this.user!.clubData.length > i; i++) {
        if (this.user!.clubData[i].clubName === clubName) {
          this.user!.clubData.splice(0, 1);
        }
      }
    },
    addMeeting(clubName: string, meetingDate: string) {
      for (let i = 0; this.user!.clubData.length > i; i++) {
        if (this.user!.clubData[i].clubName === clubName) {
          if (
            this.user!.clubData[i].meetingDates[0] === "No meeting date yet."
          ) {
            this.user!.clubData[i].meetingDates.splice(0, 1);
          }
          this.user!.clubData[i].meetingDates.push(meetingDate);
        }
      }
    },
    deleteMeeting(clubName: string, meetingDate: string) {
      for (let i = 0; this.user!.clubData.length > i; i++) {
        if (this.user!.clubData[i].clubName === clubName) {
          {
            console.log(this.user!.clubData[i].clubName === clubName);

            for (
              let j = 0;
              this.user!.clubData[i].meetingDates.length > 0;
              i++
            ) {
              if (this.user!.clubData[i].meetingDates[j] === meetingDate) {
                this.user!.clubData[i].meetingDates.splice(j, 1);
              }
            }
          }
          this.user!.clubData[i].meetingDates.push(meetingDate);
        }
      }
    },
    async getData() {
      const res = await fetch("http://localhost:3000");
      const data = await res.json();
      this.user = data;
    },
  },
  persist: true,
});
