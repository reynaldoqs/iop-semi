<template>
  <div>
<!--     <v-tabs v-model="tab" color="teal" grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="item in tabItems" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs> -->
    <div class="create-user">
      <v-tabs-items v-model="tab" class="create-tab-items">
        <v-tab-item key="Datos personales">
          <createUserpart1 :userModel="userModel" :editable="editable1" />
        </v-tab-item>
        <v-tab-item key="Datos adicionales">
          <createUserpart2 :userModel="userModel" :editable="editable2" />
        </v-tab-item>
      </v-tabs-items>
      <div class="create-buttons">
        <v-btn v-if="tab === 0" @click="validar" :disabled="!valid1" flat round outline :loading="!editable1">Verificar Datos</v-btn>
        <v-btn v-else @click="save" :disabled="!valid2" flat round outline :loading="!editable2">Crear Usuario</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import createUserpart1 from "@/moduloAdministrador/components/accountSettings/createUserFormPersonal";
import createUserpart2 from "@/moduloAdministrador/components/accountSettings/createUserFormInstitucional";
import EventBus from "@/utils/eventBus";
import usuariosApi from "@/services/usuariosService";
export default {
  data() {
    return {
      userModel: {
        nombres: null,
        primerApellido: null,
        segundoApellido: null,
        numeroCarnetIdentidad: null,
        complementoCarnetIdentidad: null,
        correoElectronico: null,
        telefonoCelular: [],
        rutas: null,
        clave: null,
        usuario: null,
        datosEntidad: {
          idEntidad: "5b2113880eca37e257fd4f9f",
          numeroEntidad: 374,
          descripcionEntidad:
            "Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación",
          siglaEntidad: "AGETIC"
        }
      },
      editable1: true,
      editable2: false,
      tab: 0,
      tabItems: ["Datos personales"],
      valid1: false,
      valid2: false
    };
  },
  methods: {
    next() {
      this.tab = 1;
    },
    save() {
      usuariosApi.postUsuario(this.userModel);
    },
    validar() {
      this.editable1 = false;
      let datosPersonales = {
        primerApellido: this.userModel.primerApellido,
        segundoApellido: this.userModel.segundoApellido,
        nombres: this.userModel.nombres,
        numeroCarnetIdentidad: this.userModel.numeroCarnetIdentidad,
        complementoCarnetIdentidad: this.userModel.complementoCarnetIdentidad
      };
      setTimeout(() => {
        usuariosApi.validarUsuario(datosPersonales).then(data => {
          if (data) {
            this.tabItems.push("Datos adicionales");
            //para el tema de que carge correctamente el tab
            this.next();
            this.editable2 = true;
          } else {
            this.editable1 = true;
          }
        });
      }, 500);
    }
  },
  mounted() {
    EventBus.$on("personalValid", valid => {
      this.valid1 = valid;
    });

    EventBus.$on("InstitucionalValid", valid => {
      this.valid2 = valid;
    });
  },
  components: {
    createUserpart1,
    createUserpart2
  },
  beforeDestroy() {
    EventBus.$off("InstitucionalValid");
    EventBus.$off("personalValid");
  }
};
</script>

<style>
.create-user {
  overflow-y: auto;
  width: 100%;
  background-color: var(--ds-bg-2);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 16px 26px 16px 16px;
}

.create-tab-items {
  min-height: 550px;
}
.create-buttons {
  text-align: center;
  padding-bottom: 20px;
}
@media screen and (max-width: 800px) {
  .create-user {
    padding: 16px 10px 16px 0px;
  }
}
</style>
