<template>
  <div>
    <div class="iop-chip">
      <div class="iop-chip-title">
        <div  :code="title" class="chip-avatar">
          <span>{{title}}</span>
        </div>
        <div class="chip-type">
          {{typeCode}}
        </div>
      </div>
      <div class="chip-footer">
        <div class="iop-chip-description">
          {{description}}
        </div>
        <div class="iop-chip-actions">
          <span @click.stop="editItem" v-show="isEditable" class="inter-links">Editar</span>
          <span @click.stop="deleteItem" v-show="isEditable" class="inter-links">Eliminar</span>
          <v-btn small icon @click.stop="addRespuestas">
            <v-icon small color="blue">
              add
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: Number,
      default: 201
    },
    description: {
      type: String,
      default: ""
    },
    typeCode: {
      type: String,
      default: "aplication/json"
    },
    idRespuesta: {
      type: String,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addRespuestas() {
      this.$emit("addRespuestas", {
        idRespuesta: this.idRespuesta,
        codigoHttp: this.title
      });
    },
    editItem() {
      this.$emit("editItem", this.idRespuesta);
    },
    deleteItem() {
      this.$emit("deleteItem", this.idRespuesta);
    }
  }
};
</script>
<style scoped>
div[code^="2"] {
  background-color: #4caf50;
}
div[code^="3"] {
  background-color: #ffa726;
}
div[code^="4"] {
  background-color: #ef5350;
}
div[code^="5"] {
  background-color: #1f59b6;
}
.iop-chip {
  background-color: var(--ds-bg-5);
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 10px;
  border-radius: 3px;
}
.iop-chip-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 0 10px;
}
.chip-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #37474f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: antiquewhite;
  font-size: 1rem;
  font-family: "Courier New", Courier, monospace;
  font-weight: 700;
}
.chip-avatar > span {
  position: relative;
  top: 3px;
}
.chip-type {
  font-size: 0.9rem;
  color: antiquewhite;
  opacity: 0.4;
}
.chip-type::before {
  content: "<";
}
.chip-type::after {
  content: ">";
}
.chip-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-left: 10px;
}
.iop-chip-description {
  margin-top: 10px;
  font-size: 1rem;
  color: white;
  font-weight: 700;
}
.iop-chip-actions > span {
  margin-left: 8px;
}
</style>
