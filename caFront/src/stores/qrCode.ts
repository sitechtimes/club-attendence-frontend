import { defineStore } from "pinia";

interface QrCode {
  base64QrCode: string | null;
  isQrCodeOpen: boolean;
  clubName: string | null;
  clubCode: string | null;
}
type ClubData = {
  clubCode: string | null;
  dateOfToday: string;
};

export const useQrCode = defineStore("qrCode", {
  state: (): QrCode => ({
    base64QrCode: null,
    isQrCodeOpen: false,
    clubName: null,
    clubCode: null,
  }),
  getters: {},
  actions: {
    openMenu(clubCode: string, clubName: string) {
      this.isQrCodeOpen = true;
      this.clubName = clubName;
      this.clubCode = clubCode;
    },
    closeMenu() {
      this.isQrCodeOpen = false;
      this.base64QrCode = null;
      this.clubName = null;
      this.clubCode = null;
    },
    async getQrCode(clubData: ClubData) {
      await fetch("http://localhost:3000/get-qrcode", {
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
        body: JSON.stringify(clubData), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((res) => (this.base64QrCode = res));
    },
  },
  persist: true,
});
