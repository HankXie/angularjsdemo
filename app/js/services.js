
angular.module('myApp.services',[])
  .factory('HttpRq', function (Conf, $http,Storage) {
    return {
      //post请求
      post: function (_reqUri, _opt, _okfn, _failfn) {
        var reqUrl = _reqUri;
        var reqOpt={name:_opt.name,password:_opt.password};
        var token=Storage.get('token').token;
        if(token ==undefined){
          token='xiehan';
        }
          $http({
            url: reqUrl,
            method:'post',
            data: reqOpt,
            headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','token':token},
            transformRequest: function(obj) {
              var str = [];
              for(var p in obj){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              }
              return str.join("&");
            }
          }).success(function(result){
            if (_okfn && typeof _okfn === "function") {
              _okfn(result);
            }
          }).error(function(err){
            if (_failfn && typeof _failfn === "function") {
              _failfn(err);
            }
          });
        },

      get: function(_reqUri,_okfn, _failfn) {
       var token=Storage.get('token').token;
       var reqUrl = _reqUri+'&token='+token;
       //var reqUrl = _reqUri;
        $http({
          url: reqUrl,
          method:'get',
          headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).success(function(result){
          if (_okfn && typeof _okfn === "function") {
            _okfn(result);
          }
        }).error(function(err){
          if (_failfn && typeof _failfn === "function") {
            _failfn(err);
          }
        });
      }
    };


  });

