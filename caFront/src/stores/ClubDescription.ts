import { defineStore } from "pinia";

type State = {
  isDescription: boolean;
  clubCode: string | null;
  clubDescription: string;
  clubName: string;
};

export const useClubsDescription = defineStore("clubDescription", {
  state: (): State => ({
    isDescription: false,
    clubCode: null,
    clubDescription: "",
    clubName: "",
  }),
  getters: {},
  actions: {
    openDescription(
      clubCode: string,
      clubName: string,
      clubDescription: string
    ) {
      this.isDescription = true;
      this.clubCode = clubCode;
      this.clubDescription = clubDescription;
      this.clubName = clubName;
    },
    closeDescription() {
      this.isDescription = false;
      this.clubCode = null;
      this.clubDescription = "";
      this.clubName = "";
    },
    async updateClubDescription(description: string, clubCode: string | null) {
      this.clubDescription = description;
      await fetch("http://localhost:3000/update-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          clubCode: clubCode,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    },
  },
  persist: true,
});
