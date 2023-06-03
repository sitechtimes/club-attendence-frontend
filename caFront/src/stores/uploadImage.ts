import { defineStore } from "pinia";

interface uploadImg {
  clubData: ClubData;
  file: Blob | string;
  sendResponse: string;
}

type ClubData = {
  clubCode: string;
  clubName: string;
};

export const useUploadImage = defineStore("upload", {
  state: (): uploadImg => ({
    clubData: { clubCode: "", clubName: "" },
    file: "",
    sendResponse: "Pending for your image!",
  }),
  actions: {
    displayUpload(clubCode: string, clubName: string) {
      this.clubData.clubCode = clubCode;
      this.clubData.clubName = clubName;
    },
    async uploadImage() {
      let clubData = new FormData();
      clubData.append("clubCode", this.clubData.clubCode);
      clubData.append("clubName", this.clubData.clubName);
      clubData.append("file", this.file);

      await fetch(
        "https://tech-club-attendance.onrender.com/upload-attendance",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: clubData,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.sendResponse = res;
        });
    },
  },
});
