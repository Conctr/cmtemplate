let moment = require("moment");
//let actionheroClient = require('./actionheroClient')
let applicationID = '2bf8fdd3b3144deea63aa54402938d68'
export function getDevicesData(deviceId, changeState,hoursBack){

  let query = {
    limit:10000,
    orderBy: [{
      field: "_ts",
      desc:true
    }],
    where: {
      "_ts":{
        type: "datetime",
        "gt": moment().subtract(hoursBack,"hours").format()
      }
    }
  }

  let clientDeviceDetails = new window.ActionheroClient({
    // Not sure how to do this part
    url: 'https://api.staging.conctr.com'
  });

  let params = {
    authorization: `jwt:${window.localStorage.getItem('userToken')}`,
    _device_id: deviceId,
    app_id: applicationID,
    where: query.where,
    limit: query.limit,
    orderBy: query.orderBy,
    access_level: "consumer"
  };


 if (clientDeviceDetails.status === "connected") {
   clientDeviceDetails.disconnect();
   clientDeviceDetails = null;
 }


  clientDeviceDetails.connect((err, details) => {
    if (err) {
      console.error(err);
    }
    clientDeviceDetails.action("device_search_historical", params);
  });
  clientDeviceDetails.on("message", (message) => {
    if (message.context === "current_data" && message.event === "update_data" && message.data && message.data.new_val && message.data.new_val._device_id === deviceId) {
      // update value
      console.log('first if',message)
    } else if (message.context === "historical_data" && message.event === "update_data" && message.data && message.data.new_val && message.data.new_val._device_id === deviceId) {
      console.log('second if',message)
      if (message.data.new_val && message.data.new_val._device_id) {
        console.log('in second if',message)
        // update graphs
      }
    } else if (message.context === "historical_data" && message.event === "initial_data" && !!message.data) {
      //
      changeState(message.data);
      if (message.data.new_val && message.data.new_val._device_id) {
        // update graphs
      }
    }
  });

  clientDeviceDetails.on("error", (error) => {
    console.error("Error", error);
  });

}
