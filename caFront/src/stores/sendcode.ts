export const useStore = defineStore("global", {
    state: (): dataRes => ({
        fetchURL: "http://localhost:3000/",

        clubList: [],
        loading: false,
        currentAttendance: [],
        selectedClub: false,
        getDates: false,
        listOfDates: [],
        currentClubCode: null,
        attendanceAtDate: [],
        filterDate: null,
        currentFilterDate: "Select Date",
    }),
    getters: {},
    actions: {
          pushCurrentAttendance(param: clubData) {
      this.currentAttendance = param;
      console.log(this.currentAttendance);
      this.selectedClub = true;
    },
    pushListOfDates(param: Array<number | string>) {
      this.listOfDates = param;
      console.log(this.listOfDates);
      this.getDates = true;
    },
    pushClubCode(param: any) {
      this.currentClubCode = param;
      console.log(this.currentClubCode);
    },
    pushFilterDate(param: string | null) {
      this.filterDate = param;
    },

    pushAttendanceAtDate(param: studentsAtDate) {
      this.attendanceAtDate = param;
      console.log(this.attendanceAtDate);
    },

    clearData() {
      this.clubList = [];
      this.loading = false;
      this.currentAttendance = [];

      this.getDates = false;
      this.listOfDates = [];
      this.currentClubCode = null;
      this.attendanceAtDate = [];
      this.filterDate = null;
    },

        async getClubData(clubCode: string | undefined) {
            this.pushClubCode(clubCode);
            const postData = {
                clubCode: clubCode,
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
        }