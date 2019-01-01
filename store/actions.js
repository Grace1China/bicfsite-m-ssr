const axios = require("axios");
import { mapState } from "vuex";
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

export const getMinistry = function(context, pars) {
  var url = `${APIHOST.DOMAIN}/ministries?type=${pars.church}`;
  console.log(url)
  axios
    .get(url)
    .then(function(response) {
      context.state.pagedb.ministries = {
        list: response.data.data.contents,
        total_pages: response.data.data.total_pages
      };
      console.log(context.state.pagedb.ministries);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    })
    .then(function(response) {
      return "last";
    });
};

export const getEvents = function(context, pars) {
  var url = `${APIHOST.DOMAIN}/events?notpar=true`;
  if (pars.ministry != undefined) {
    url = url + "&ministry=" + pars.ministry;
  }
  if (pars.church != undefined) {
    url = `${url}&church=${pars.church}`;
  }

  if (pars.page_size != undefined) {
    url = url + "&page_size=" + pars.page_size;
  } else {
    url = url + "&page_size=" + 10;
  }

  if (pars.start != undefined) {
    url = url + "&start=" + pars.start;
  } else {
    url = url + "&start=" + 1;
  }
  console.log('------getEvents-------'+url)
  axios
    .get(url)
    .then(function(response) {
      context.state.pagedb.events = {
        list: response.data.data.events,
        total_pages: response.data.data.total_pages
      };

      // handle success
      console.log('------getEvents:then----------')
      console.log(context.state.pagedb.events);
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      return error;
    })
    .then(function(response) {
      // always executed
      return "last";
    });

  return "after function";
};

export const getArticle = function(context, query) {
  //en-GB  zh-CN
  var url
  var l2c = ""
  if(query.q != undefined){
    if(query.lang == 'zh'){
      l2c = 'zh-CN'
    }else{
      l2c = 'en-GB'
    }
    url = `${APIHOST.DOMAIN}/content/${query.q}?lang=${(l2c||"")}`
  } else {
    url = `${mst_api}/mst/getContentByID/${query.id}`
  }  


  console.log(url)
  axios
    .get(url)
    .then(function(response) {
      console.log(response.data);
      if (
        (response.data.message == "Success" || response.data.code==0) &&
        response.data.data != undefined
      ) {
        console.log('get aritcle Success')
        console.log(response.data.data)
        console.log(response.data.data.title)
        var img1,img2
        if(typeof(response.data.data.images)=='string'){
          img1 = (JSON.parse(response.data.data.images)||{}).image_intro
          img2 = (JSON.parse(response.data.data.images)||{}).image_fulltext

        } else {
          img1 = response.data.data.images.image_intro
          img2 = response.data.data.images.image_fulltext

        }
        console.log(img1)
        console.log(img2)


        context.state.pagedb.article = {
          title:response.data.data.title,
          image_intro:img1,
          image_fulltext:img2,
          introtext:response.data.data.introtext,
          fulltext:response.data.data.fulltext
        };
        console.log(context.state.pagedb.article)
      } else {
        context.state.pagedb.article = "";
      }
      return response;
    })
    .catch(function(error) {
      return error;
    })
    .then(function(response) {
      return "last";
    });
};

export const getEventById = function(context, id) {
  axios
    .get(`${APIHOST.DOMAIN}/event/` + id)
    .then(function(response) {
      // handle success
      context.state.pagedb.theEvent = response.data.data;
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
};

export const getSermonById = function(context, id) {
  axios
    .get(`${APIHOST.DOMAIN}/study/` + id)
    .then(function(response) {
      // handle success
      context.state.pagedb.theSermon = response.data.data;

      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
};


export const getSermons = function(context, pars) {
  var url = `${APIHOST.DOMAIN}/studies?notpar=true`;
  if (pars.ministry != undefined) {
    url = url + "&ministry=" + pars.ministry;
  }
  if (pars.teacher != undefined) {
    url = url + "&teacher=" + pars.teacher;
  }
  if (pars.series != undefined) {
    url = url + "&series=" + pars.series;
  }
  if (pars.page_size != undefined) {
    url = url + "&page_size=" + pars.page_size;
  } else {
    url = url + "&page_size=" + 10;
  }
  if (pars.start != undefined) {
    url = url + "&start=" + pars.start;
  } else {
    url = url + "&start=" + 1;
  }
  console.log(url)
  axios
    .get(url)
    .then(function(response) {
      // handle success
      console.log(response)
      context.state.pagedb.sermon = {
        list: response.data.data.studies,
        total_pages: response.data.data.total_pages
      };
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
};

export const getSeries = function(context, pars) {
  var aurl = `${mst_api}/mst/getSeriesByChurch/${pars.church}`
  axios({
    method:'get',
    url:aurl,
    data: {
      page_size: pars.pageSize, 
      start: pars.page
    }
  }).then(function(response) {
      // handle success
      console.log('--------getSeries------------')
      console.log(response)
      context.state.pagedb.series = {
        list: response.data.data,
        total_pages: response.data.totalPage
      }
    }).catch(function(error) {
      // handle error
      console.log(error);
    }).then(function() {
      // always executed
    });
};

export const getTeacher = function(context, pars) {
  var url = `${mst_api}/mst/getTeacherByChurch/${pars.church}`
  console.log(url)
  axios.get(url).then(function(response) {
      // handle success
      console.log('--------getTeacher------------')
      console.log(response)
      context.state.pagedb.teachers = {
        list: response.data.data,
        total_pages: 1
      }
    }).catch(function(error) {
      // handle error
      console.log(error);
    }).then(function() {
      // always executed
    });
};

export const subscribe = function(context, email) {
  axios
    .post(`${APIHOST.DOMAIN}/subscribe`, { email: email })
    .then(function(response) {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
};

export const churchs = function(context) {
  axios
    .post(`${APIHOST.DOMAIN}/churchs`)
    .then(function(response) {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
};


