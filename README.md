#club-attendance-frontend

##Components

###Button.vue
*A reusuable button that is designed with a seagull in the gold and white color scheme. To change the color scheme of the seagull, you may so by changing the main color and sub color for class ".button--piyo" and ".button--hoo" in the style
```.button--piyo {
  --main_color: white;
  --sub_color1: #f4e19c;
  --sub_color2: #ff8108;
  --base_color: #000;
  --border_radius1: 60px 60px 40px 40px / 48px 48px 30px 30px;
  --border_radius2: 70px 70px 40px 40px / 48px 48px 30px 30px;
  --border_radius3: 40px 40px 40px 40px / 48px 48px 30px 30px;
}
.button--hoo {
  --main_color: #4993ff;
  --sub_color1: #385082;
  --sub_color2: #fff58f;
  --sub_color3: #fff;
  --base_color: #fff;
  --border_radius1: 50px 50px 50px 50px / 40px 40px 40px 40px;
  --border_radius2: 60px 60px 50px 50px / 40px 40px 40px 40px;
  --border_radius3: 40px 40px 50px 50px / 60px 60px 40px 40px;
  --border_radius3: 50px 50px 45px 45px / 40px 40px 60px 60px;
}
```

###Camera.vue
*A Vue component that captures and decodes QR codes using the device's camera.

*This component consists of a container div that is conditionally displayed if "clubActivity.isCameraAllowed === true". Inside the div, there is a qr-code-stream component imported from the npm package called vue3-qrcode-reader and the documentation is at "https://www.vuescript.com/qr-code-reader-vue-3/". When the Camera.vue is accessed, it triggers the onDecode and onInite async functions.

``` async onInit(promise: any) {
      try {
        await promise;
      } catch (error: any) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    ```
*The onInit is an asynchronous function that handles the initialization of the QR code stream by passing in the paramter 'promise'. The try-catch block  handles the error that could occur during the initialization process. The function checks 'error.name' to determine the type of error and returns it as an error message.

```async function onDecode(data: string) {
      state.data = data;
      qrCodeStore.qrCode = data;
      console.log(userData.user);

      let info = {
        qrCode: qrCodeStore.qrCode,
        user: userData.user,
        dateOfToday: dateOfToday,
      };
      await qrCodeStore.markAttendence(info);
      state.response = qrCodeStore.qrcodeResponse;
    }
    ```
*The onDecode is an asynchronous function that is called when a QR code is successfully decoded by the QR code reader by passing in the parameter 'data' which is the decoded data from the qr scan. It calls the qrCodeStore.markAttendance method and passes the info object as a parameter. This method is responsible for handling the attendance marking process or performing some action based on the QR code data and user data. These actions are passed in from the pinia store useQrCode. The response from the onDecode function will then be displayed. 





