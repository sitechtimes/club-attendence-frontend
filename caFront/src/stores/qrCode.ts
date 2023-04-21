import { defineStore } from "pinia";

interface QrCode {
  base64QrCode: string | null;
  isQrCodeOpen: boolean;
  clubData: ClubData;
}
type ClubData = {
  clubCode: string | null;
  dateOfToday: string | null;
};

export const useQrCode = defineStore("qrCode", {
  state: (): QrCode => ({
    base64QrCode: null,
    clubData: { clubCode: null, dateOfToday: null },
    isQrCodeOpen: false,
  }),
  getters: {},
  actions: {
    openMenu() {
      this.isQrCodeOpen = true;
    },
    closeMenu() {
      this.isQrCodeOpen = false;
      this.base64QrCode = null;
    },
    defineClubCode(clubCode: string) {
      this.clubData.clubCode = clubCode;
    },
    defineDateOfToday(clubCode: string) {
      this.clubData.dateOfToday = clubCode;
    },
    async getQrCode() {
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
        body: JSON.stringify(this.clubData), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((res) => (this.base64QrCode = res));
    },
  },
  persist: true,
});
