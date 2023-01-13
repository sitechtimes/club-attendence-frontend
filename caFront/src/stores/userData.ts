import { defineStore } from "pinia";

type UserObject = {
  email: string;
  emailDomain: string;
  firstName: string;
  grade: string;
  lastName: string;
  officalClass: string;
  osis: string;
  positionOfClub: [
    {
      clubCode: string;
      postion: string;
    }
  ];
  type: string;
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
    addOficallClass(officalClass: string) {
      this.user!.officalClass = officalClass;
    },
  },
  persist: true,
});
