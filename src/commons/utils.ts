import admin from 'firebase-admin';

export const getTargetUserDate = (user) => {
  const now = new Date();
  const timeAtUser = new Date(now.getTime() + user.timezone * -60000);
  const dateFrom = timeAtUser.toISOString().substring(0, 10); //해당 user timezone의 현재일
  const tmpDate = new Date(dateFrom);
  const dateTo = tmpDate.setUTCDate(tmpDate.getUTCDate() + 1);
  return { dateFrom, dateTo }; //해당 user timezone의 현재일 + 1일
};

export const sendNotification = ({ token, title, body, data }) => {
  const mtitle = title;
  const mbody = body;

  if (token) {
    let message: any = {
      notification: {
        title: mtitle,
        body: mbody,
      },
      android: {
        ttl: 3600 * 1000, // 1 hour in milliseconds
        priority: 'normal',
        notification: {
          title: mtitle,
          body: mbody,
        },
      },
      apns: {
        headers: {
          'apns-priority': '10',
        },
        payload: {
          aps: {
            badge: 1,
          },
        },
      },
      data,
      token,
    };

    admin
      .messaging()
      .send(message)
      .then(function (response) {
        console.log('Successfully sent message: : ', response);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      });
  }
};
