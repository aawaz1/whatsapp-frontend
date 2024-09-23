// import moment from "moment";


// export const dateHandler = (date) => {
//     let now = moment();
//     let momentDate = moment(date);
//     let time = momentDate.fromNow(true);
//     let dateByHourAndMin = momentDate?.format("HH : mm");
//     const getDay = () => {
//         let days = time.split(" ")[0];
//         if(Number(days)<8){
//             return now.subtract(Number(days), "days")?.format("dddd")

//         }else{
//            return  momentDate?.format("DD/MM/YYYY")        
//         }
//     } 
//     if(time= "a few seconds ago"){
//         return 'Now';

//     } 
//     if(time.search('minute')!== -1){
//         let mins = time.split("")[0]
//         if(mins = "a"){
//             return "1 min"
//         }else{
//             return `${mins} min ago`
//         }
//     }

//     if(time.search('hour')!== -1){
//        return dateByHourAndMin;
//     }

//     if(time === "a day"){
//         return 'Yesterday';
//     }

//       if(time.search('days')!== -1){
//        return getDay();
//     }


//     return time;

// }

import moment from "moment";

export const dateHandler = (date) => {
    let now = moment();
    let momentDate = moment(date);
    let time = momentDate.fromNow(true);  // Get time difference in a human-readable format
    let dateByHourAndMin = momentDate.format("HH:mm");

    const getDay = () => {
        let days = time.split(" ")[0];
        if (Number(days) < 8) {
            return momentDate.format("dddd");  // Return the day of the week
        } else {
            return momentDate.format("DD/MM/YYYY");  // Return the date in DD/MM/YYYY format
        }
    };

    if (time === "a few seconds") {
        return "Now";  // If the message was sent just a few seconds ago
    }

    if (time.includes("minute")) {
        let mins = time.split(" ")[0];
        return mins === "a" ? "1 min ago" : `${mins} min ago`;
    }

    if (time.includes("hour")) {
        return dateByHourAndMin;  // Return time in HH:mm format
    }

    if (time === "a day") {
        return "Yesterday";  // If it's exactly one day ago
    }

    if (time.includes("days")) {
        return getDay();  // Handle cases where it's more than 1 day ago
    }

    return time;  // Return the default moment.js formatted time
};
