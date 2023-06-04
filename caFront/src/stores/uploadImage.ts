import { defineStore } from "pinia";

interface UploadImg {
  clubData: ClubData;
  file: Blob | string;
  sendResponse: string;
}

type ClubData = {
  clubCode: string | undefined;
  clubName: string | undefined;
};

export const useUploadImage = defineStore("upload", {
  state: (): UploadImg => ({
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
        .then((res) => res.json())
        .then((res) => {
          this.sendResponse = res;
        });
    },
  },
});
