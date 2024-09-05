var axios = require('axios');
const authLogin  = require("../config/shiprocketConfig")


router.post('/shiprocket-rate-calculation', async function(req, res, next) {
  let rs_data = await srShippingRateCalculation(700008,700009,5,2000);
  res.status(200).json(rs_data);
  function srShippingRateCalculation(pickup_postcode, delivery_postcode, weight, declared_value) {
    return new Promise(async (resolve, reject) => {
      let resData = {
        status: false,
        mainToken: {},
        message: "Fail!!",
      };
      try {
        let getToken = await authLogin();
        let parmers = 'pickup_postcode=' + pickup_postcode;
        parmers += '&delivery_postcode=' + delivery_postcode;
        parmers += '&weight=' + weight;
        parmers += '&cod=1';
        parmers += '&declared_value=' + declared_value;
        parmers += '&rate_calculator=1';
        parmers += '&blocked=1';
        parmers += '&is_return=0';
        parmers += '&is_web=1';
        parmers += '&is_dg=0';
        parmers += '&only_qc_couriers=0';
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        if (getToken.status) {
          var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://apiv2.shiprocket.in/v1/external/courier/serviceability?' + parmers,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken}`
            }
          };
          axios(config).then(function(response) {
            resData.status = true;
            resData.message = 'Success!!';
            resData.mainset = response.data;
            resolve(resData);
          }).catch(function(error) {
            //++++++++++++++++++++++++++++++++++++
            console.log(error);
            console.log('ShippingRateCalculation');
            //++++++++++++++++++++++++++++++++++++
            resData.status = false;
            resData.message = 'Error!!';
            resData.mainset = JSON.stringify(error);
            reject(resData);
          });
        } else {
          //+++++++++++++++++++++++++++++++++++++++++
          console.log('ShippingRateCalculation');
          //+++++++++++++++++++++++++++++++++++++++++
          resData.status = false;
          resData.message = 'Error!!';
          reject(resData);
        }
      } catch (e) {
        //+++++++++++++++++++++++++++++++++++++++++
        console.error(e);
        console.log('ShippingRateCalculation');
        //+++++++++++++++++++++++++++++++++++++++++
        reject(resData);
      }
    });
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++
  //Function Login
  //++++++++++++++++++++++++++++++++++++++++++++++++++
//   function srlogin() {
//     return new Promise(async (resolve, reject) => {
//       let resData = {
//         status: false,
//         mainToken: {},
//         message: "Fail!!",
//       };
//       //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//       var srlogindata = JSON.stringify({
//         "email": "",
//         "password": ""
//       });
//       //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//       try {
//         var config = {
//           method: 'post',
//           maxBodyLength: Infinity,
//           url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           data: srlogindata
//         };
//         //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//         //CALL
//         //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//         axios(config)
//           .then(function(response) {
//             resData.status = true;
//             resData.message = 'Success!!';
//             resData.mainToken = response.data.token;
//             resolve(resData);
//           }).catch(function(error) {
//             console.error(error);
//             reject(resData);
//           });
//       } catch (e) {
//         console.error(e);
//         reject(resData);
//       }
//     });
//   }

});
//+++++++++++++++++++++++++++++++++++++++
module.exports = router;
//+++++++++++++++++++++++++++++++++++++++