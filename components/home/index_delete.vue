
<template>
  <PageLayout>
    <template slot="pagecont1">
      <homebanner/>
      <welcome/>
      <churchfilter/>  
      <newsletter/>
      <contactusmail/>
      <bottompart/>
    </template>
  </PageLayout>
</template>

<script>

import churchfilter from './ChurchFilter.vue';
import homebanner from './homebanner.vue';
import welcome from './Welcome.vue';
import newsletter from './NewsLetter.vue';
import contactusmail from './ContactUsMail.vue';
import bottompart from './bicfAppSocialfoot.vue'

export default {

        components: {
            'churchfilter':churchfilter,
            'homebanner':homebanner,
            'welcome':welcome,
            'newsletter':newsletter,
            'contactusmail':contactusmail,
            'bottompart':bottompart,

        },
        data() {
          return {
           
          }
        },

       
      }
</script>
<style scoped>


.tophere1 {
  font-family: 'MyriadPro Light', Helvetica, Arial, sans-serif !important;
  font-size: 1.5rem !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}



	
</style>







