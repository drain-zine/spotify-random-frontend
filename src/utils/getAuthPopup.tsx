export const getAuthPopup = (url: string) => {
  const windowArea = {
    width: Math.floor(window.outerWidth * 0.5),
    height: Math.floor(window.outerHeight * 0.3),
  };

  if (windowArea.width < 400) {
    windowArea.width = 400;
  }
  if (windowArea.height < 630) {
    windowArea.height = 630;
  }

  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
        width=${windowArea.width},height=${windowArea.height}`;

  const eventer = window.addEventListener;

  //Listen to message from child window
  const handleMessageCallback = (authWindow: Window) =>
    new Promise((resolve, reject) => {
      eventer(
        "message",
        (e) => {
          if (authWindow) {
            if (e.data.auth) {
              authWindow.close();
              resolve(e.data.auth);
            } else {
              authWindow.close();
              reject("Unauthorised");
            }
          }
        },
        false
      );

      setInterval(() => {
        if (authWindow.closed) {
          reject("Window Closed");
        }
      }, 200);
    });

  return {
    open: () => window.open(url, "Authenticate", windowOpts),
    handleMessageCallback: (authWindow: Window) =>
      handleMessageCallback(authWindow),
  };
};
