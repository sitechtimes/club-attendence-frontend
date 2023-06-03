import { defineStore } from "pinia";

interface QrCode {
  base64QrCode: string | null;
  isQrCodeOpen: boolean;
  clubData: ClubData;
  storeClub: string | null | undefined;
  storeQr: string | null;
  qrCode: string | null;
  qrcodeResponse: string;
}
type ClubData = {
  clubCode: string | null | undefined;
  dateOfToday: string | null | undefined;
  clubName: string | null | undefined;
};

export const useQrCode = defineStore("qrCode", {
  state: (): QrCode => ({
    base64QrCode: null,
    clubData: { clubCode: null, dateOfToday: null, clubName: null },
    isQrCodeOpen: false,
    storeQr: null,
    storeClub: null,
    qrCode: null,
    qrcodeResponse: "",
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

      this.checkerForClub();
    },
    addStoreClub(clubName: string | null | undefined) {
      this.storeClub = clubName;
      this.storeQr = this.base64QrCode;
    },
    removeStoreClub() {
      this.storeClub = null;
      this.storeQr = null;
    },
    closeMenu() {
      this.isQrCodeOpen = false;
      this.clubData.clubCode = null;
      this.clubData.dateOfToday = null;
      this.clubData.clubName = null;
      this.checkerForClub();
    },
    checkerForClub() {
      if (this.clubData.clubName !== this.storeClub) {
        this.base64QrCode = null;
      } else {
        this.base64QrCode = this.storeQr;
      }
    },
    async getQrCode() {
      await fetch("https://tech-club-attendance.onrender.com/get-qrcode", {
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
        .then((res) => {
          this.base64QrCode = res;
          this.storeClub = res;
        });
    },
    async markAttendence(data: object | null) {
      await fetch("https://tech-club-attendance.onrender.com/mark-attendence", {
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
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((res) => {
          this.qrcodeResponse = res;
        });
    },
  },
  persist: true,
});
