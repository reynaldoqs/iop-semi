<template>
    <div>
    <v-layout row wrap>
      <v-flex xs12 md9 class="iop-card">
      <form-information title="Datos personales" description="Muestra los datos personales de un usuario registrado." />
      <v-form ref="formUsiarioPeronal" class="iop-form-container">
          <v-layout row wrap>
            
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Nombre del ambiente
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field  disabled v-model="selectedUser.nombres"></v-text-field>
            </v-flex>
    
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Primer Apellido
                  <small>(Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field disabled v-model="selectedUser.primerApellido"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Segundo Apellido
                  <small>(Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field disabled v-model="selectedUser.segundoApellido"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Número de carnet
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field disabled v-model="selectedUser.numeroCarnetIdentidad"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Número de complemento
                  <small>(Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field disabled v-model="selectedUser.complementoCarnetIdentidad"></v-text-field>
            </v-flex>

          </v-layout>
        </v-form> 
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import formInformation from "@/moduloAdministrador/components/shared/formComponents/formInformationBar";
export default {
  name: "Usuario-personal",
  data() {
    return {
      editable: false
    };
  },
  props: {
    selectedUser: {
      type: Object,
      required: false
    }
  },
  components: {
    formInformation
  }
};
</script>
