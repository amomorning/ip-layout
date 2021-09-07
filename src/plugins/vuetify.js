import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo.lighten1, // #5C6BC0
        secondary: colors.teal.base, // #009688
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});