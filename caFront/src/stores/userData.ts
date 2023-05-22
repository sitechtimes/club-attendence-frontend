import { defineStore } from "pinia";

type UserObject = {
  email: string;
  president: boolean;
  emailDomain: string;
  firstName: string;
  grade: string;
  lastName: string;
  officalClass: string;
  osis: string;
  clubData: [
    {
      clubCode: string;
      clubName: string;
      position: string;
      meetingDates: Array<string>;
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
      this.user!.officalClass = officalClass;
    },
    async getData() {
      const res = await fetch("http://localhost:3000");
      const data = await res.json();
      this.user = data;
    },
  },
  persist: true,
});
