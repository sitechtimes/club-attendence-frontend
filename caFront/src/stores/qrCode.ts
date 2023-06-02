import { defineStore } from "pinia";

interface QrCode {
  base64QrCode: string | null;
  isQrCodeOpen: boolean;
  clubData: ClubData;
}
type ClubData = {
  clubCode: string | null | undefined;
  dateOfToday: string | null;
  clubName: string | null | undefined;
};

export const useQrCode = defineStore("qrCode", {
  state: (): QrCode => ({
    base64QrCode: null,
    clubData: { clubCode: null, dateOfToday: null, clubName: null },
    isQrCodeOpen: false,
  }),
  getters: {},
  actions: {
    openMenu(
      clubCode: string | undefined,
      dateOfToday: string,
      clubName: string | undefined
    ) {
      this.isQrCodeOpen = true;
      this.clubData.clubCode = clubCode;
      this.clubData.dateOfToday = dateOfToday;
      this.clubData.clubName = clubName;
    },
    closeMenu() {
      this.isQrCodeOpen = false;
      this.base64QrCode = null;
      this.clubData.clubCode = null;
      this.clubData.dateOfToday = null;
      this.clubData.clubName = null;
    },
    async getQrCode() {
      await fetch("http://localhost:3000/get-qrcode", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(this.clubData),
      })
        .then((res) => res.json())
        .then((res) => (this.base64QrCode = res));
    },
  },
  persist: true,
});
