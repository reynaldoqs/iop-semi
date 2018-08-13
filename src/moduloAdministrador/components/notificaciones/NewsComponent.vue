<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="350"
      offset-x
      open-on-hover
      close-delay="100" 
      open-delay="50"
      left
    >
    <v-btn flat icon color="red lighten-2" slot="activator">
        <v-icon>notifications</v-icon>
    </v-btn>

      <div class="notifications-container">
        <div class="notifications-header notification-list-header">
            <h2>notificaiones <span class="notifications-count">3</span></h2>
        </div>
        <v-divider></v-divider>
        <div class="notifications-list">
            <v-list two-line light>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              light
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar tile>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        </div>
      </div>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    items: [
      { header: "Today" },
      {
        avatar:
          "https://www.segip.gob.bo/wp-content/themes/segiptheme/img/logo-sm.png",
        title: "Brunch this weekend?",
        subtitle:
          "<span>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend.?"
      },
      { divider: true, inset: true },
      {
        avatar:
          "data:image/png;base64,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",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this."
      },
      { divider: true, inset: true },
      {
        avatar:
          "https://datos.gob.bo/uploads/group/2016-11-18-154806.384109ministerioeducacion.JPG",
        title: "Oui oui",
        subtitle:
          "<span>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      }
    ]
  })
};
</script>
<style scoped>
.notifications-container {
  background-color: white;
}
.notification-list-header {
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--inter-primary);
}
.notifications-header {
  font-weight: 300;
  color: #f4f4f4;
  font-size: 0.9rem;
  font-family: "Roboto";
}
.notifications-count {
  width: 25px;
  height: 25px;
  background-color: var(--inter-secondary);
  color: white;
  display: inline-block;
  border-radius: 50%;
  line-height: 27px;
  margin-left: 10px;
  text-align: center;
}
</style>